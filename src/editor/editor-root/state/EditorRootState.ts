import { action } from 'mobx';

import { DockableUIState } from '../../dockable-ui/state/DockableUIState';
import { DuiPanelTab } from '../../dockable-ui/state/DuiPanel';
import { EditorDialogType } from '../../dialogs/state/EditorDialogTypes';
import { EditorDialogViewState } from '../../dialogs/state/EditorDialogViewState';
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
  private tabMap = new Map<string, PanelTab>();
  public tabStatesMap = new Map<string, TabBaseState>();

  constructor() {
    // Setup story - will be done elsewhere later and passed into constructor
    const story = new Story();
    const firstPage = new Page();
    firstPage.setName('First page');
    story.addPage(firstPage);
    this.story = story;

    this.dockableUiState.addEventListener('close-tab', this.onCloseTab);
  }

  @action public startAddPage = () => {
    this.dialogViewState.showDialog(EditorDialogType.ADD_PAGE);
  };

  @action public addPage = (name: string) => {
    const page = new Page();
    page.setName(name);

    this.story.addPage(page);
  };

  public saveLayout = () => {
    const layoutModel = this.dockableUiState.getLayout();
    console.log('layoutModel:', layoutModel);

    //localStorage.setItem('layout', JSON.stringify(layoutModel));
  };

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
