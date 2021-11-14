import { action, observable } from 'mobx';

import { DockableUIState } from '../../dockable-ui/state/DockableUIState';
import { DuiPanelTab } from '../../dockable-ui/state/DuiPanel';
import { EditorDialogType, EditorDialogViewState } from '../../dialogs/state/EditorDialogViewState';
import { EditorRootStorage } from './EditorRootStorage';
import { GamePlayerRootState } from '../../../game-player/state/GamePlayerRootState';
import { GameStoryFactory } from '../../../game-player/utils/GameFactory';
import { LayoutModel, PanelModel } from '../../dockable-ui/model/PanelLayoutModel';
import { Page } from '../../common/state/Page';
import { PageEditorState } from '../../page-editor/state/PageEditorState';
import { PageInspectorState } from '../../page-inspector/state/PageInspectorState';
import { PanelTabType } from './PanelTabType';
import { RandomUtils } from '../../../utils/RandomUtils';
import { Story } from '../../common/state/Story';
import { StoryGraphState } from '../../story-graph/state/StoryGraphState';
import { StoryModel } from '../../common/model/StoryModel';
import { TabBaseState } from './TabBaseState';
import { toastManager } from '../../../utils/ToastManager';

export interface PanelTab extends DuiPanelTab {
  type: PanelTabType;
}

export class EditorRootState {
  @observable.ref public gameState?: GamePlayerRootState;
  public story: Story;
  public storyGraphState = new StoryGraphState();
  public dockableUiState = new DockableUIState();
  public editorStorage = new EditorRootStorage();
  public dialogViewState = new EditorDialogViewState();
  public tabStatesMap = new Map<string, TabBaseState>();
  private tabMap = new Map<string, PanelTab>();

  constructor() {
    // Setup story - will be done elsewhere later and passed into constructor
    const firstPage = new Page();
    firstPage.setName('First page');

    const story = new Story();
    story.addPage(firstPage);
    story.firstPageId = firstPage.id;
    this.story = story;

    this.dockableUiState.addEventListener('close-tab', this.onCloseTab);

    this.loadEditor();
  }

  public loadStory(model: StoryModel) {
    // TODO - should the fromModels be firing events for the story graph, or all at once at end?
    const story = Story.fromModel(model);

    // Now that the story is made, can assign page refs to items with linked pages
    story.pages.forEach((page) => {
      // Loop over all items
      page.items.forEach((item) => {
        // If this has a linkedPageId, find the page for it and assign
        if (!item.linkedPageId) {
          return;
        }

        const linkedPage = story.pages.find((p) => p.id === item.linkedPageId);
        item.linkedPage = linkedPage;
      });
    });

    this.story = story;
  }

  public startAddPage = () => {
    this.dialogViewState.showDialog(EditorDialogType.ADD_PAGE);
  };

  @action public addPage = (name: string) => {
    const page = new Page();
    page.setName(name);

    this.story.addPage(page);

    toastManager.successToast('Created new page ' + name);
  };

  public startSaveLayout = () => {
    this.dialogViewState.showDialog(EditorDialogType.SAVE_LAYOUT);
  };

  public saveLayout = (name: string) => {
    // Get panel layout from dockable ui
    const panelLayout = this.dockableUiState.getLayout();

    // Extend the DuiPanelModel to use PanelModel
    const panelModels: PanelModel[] = [];
    panelLayout.panels.forEach((pModel) => {
      // PanelModel uses PanelTabs instead of DuiPanelTabs
      const panelTabs: PanelTab[] = [];

      pModel.tabs.forEach((pModelTab) => {
        const tab = this.tabMap.get(pModelTab.id);
        if (tab) {
          panelTabs.push(tab);
        }
      });

      panelModels.push({ id: pModel.id, tabs: panelTabs });
    });

    const layoutModel: LayoutModel = {
      ...panelLayout,
      name,
      panels: panelModels,
    };

    // Then save the layout
    this.editorStorage.saveUserLayout(layoutModel);

    toastManager.successToast('Saved layout ' + name);
  };

  public loadLayout(layoutModel: LayoutModel) {
    // Before loading this new layout, clear any state from the previous layout
    this.resetLayoutState();

    // Pull out the tabs from the layout model
    const tabs: PanelTab[] = [];
    layoutModel.panels.forEach((pModel) => {
      pModel.tabs.forEach((tab) => {
        // Create the tab state for this tab
        this.tabMap.set(tab.id, tab);
        this.createTabState(tab);
      });
    });

    // Then give the layout to dockable ui to create panels
    this.dockableUiState.setLayout(layoutModel);
  }

  public addTab = (tabType: PanelTabType, panelId?: string) => {
    // Create the tab
    const tabId = RandomUtils.createId();
    const tab: PanelTab = {
      id: tabId,
      label: tabType,
      type: tabType,
    };
    this.tabMap.set(tab.id, tab);

    // Setup any states this tab requires
    this.createTabState(tab);

    // Give it to dockable ui to render
    this.dockableUiState.addPanelTab(tab, panelId);
  };

  public getTab(id: string): PanelTab | undefined {
    return this.tabMap.get(id);
  }

  @action public startGamePlayer = (startPageId?: string) => {
    // Get story data model from current story being edited
    const storyModel = this.story.toModel();

    // Create the game story from the model
    const gameStory = GameStoryFactory.createGameStory(storyModel);

    // If launching the game from a certain page
    if (startPageId) {
      gameStory.firstPageId = startPageId;
    }

    // Pass this into a newly made game state
    const debugMode = true;
    this.gameState = new GamePlayerRootState(gameStory, debugMode);

    // Can now open the game player dialog
    this.dialogViewState.showDialog(EditorDialogType.GAME_PLAYER);
  };

  @action public onCloseGamePlayer = () => {
    // Clear the previous game state
    this.gameState = undefined;
  };

  private loadEditor() {
    // Load the initial layout
    const layout = this.editorStorage.getInitialLayout();
    this.loadLayout(layout);
  }

  private resetLayoutState() {
    this.tabMap.clear();
    this.tabStatesMap.clear();
  }

  private createTabState(tab: PanelTab) {
    // Create whatever state this tab component requires
    switch (tab.type) {
      case PanelTabType.PAGE_EDITOR:
        {
          const pageEditState = new PageEditorState(tab, this.story.pages);
          this.tabStatesMap.set(tab.id, pageEditState);
        }
        break;
      case PanelTabType.PAGE_INSPECTOR:
        {
          const pageInspectorState = new PageInspectorState(tab, this.story.pages);
          this.tabStatesMap.set(tab.id, pageInspectorState);
        }
        break;
    }
  }

  private onCloseTab = (tabId: string) => {
    // Remove any states made for this tab
    this.tabStatesMap.delete(tabId);

    // Then remove the tab from the map
    this.tabMap.delete(tabId);
  };
}
