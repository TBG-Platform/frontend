import { action } from 'mobx';

import { DockableUIState } from '../../dockable-ui/state/DockableUIState';
import { DuiLayoutModel, LayoutModel, PanelModel } from '../../dockable-ui/model/PanelLayoutModel';
import { DuiPanelTab } from '../../dockable-ui/state/DuiPanel';
import { EditorDialogType, EditorDialogViewState } from '../../dialogs/state/EditorDialogViewState';
import { EditorRootStorage } from './EditorRootStorage';
import { Page } from '../../common/state/Page';
import { PageEditorState } from '../../page-editor/state/PageEditorState';
import { PageInspectorState } from '../../page-inspector/state/PageInspectorState';
import { PanelTabType } from './PanelTabType';
import { RandomUtils } from '../../../utils/RandomUtils';
import { Story } from '../../common/state/Story';
import { StoryGraphState } from '../../story-graph/state/StoryGraphState';
import { TabBaseState } from './TabBaseState';

export interface PanelTab extends DuiPanelTab {
  type: PanelTabType;
}

export class EditorRootState {
  public story: Story;
  public storyGraphState = new StoryGraphState();
  public dockableUiState = new DockableUIState();
  public editorStorage = new EditorRootStorage();
  public dialogViewState = new EditorDialogViewState();
  public tabStatesMap = new Map<string, TabBaseState>();
  private tabMap = new Map<string, PanelTab>();

  constructor() {
    // Setup story - will be done elsewhere later and passed into constructor
    const story = new Story();
    const firstPage = new Page();
    firstPage.setName('First page');
    story.addPage(firstPage);
    this.story = story;

    this.dockableUiState.addEventListener('close-tab', this.onCloseTab);
  }

  public startAddPage = () => {
    this.dialogViewState.showDialog(EditorDialogType.ADD_PAGE);
  };

  @action public addPage = (name: string) => {
    const page = new Page();
    page.setName(name);

    this.story.addPage(page);
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
  };

  public loadLayout(layoutModel: LayoutModel) {
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
