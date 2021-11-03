import { action } from 'mobx';

import { DockableUIState } from '../../dockable-ui/state/DockableUIState';
import { DuiPanelTab } from '../../dockable-ui/state/DuiPanel';
import { EditorDialogType } from '../../dialogs/state/EditorDialogTypes';
import { EditorDialogViewState } from '../../dialogs/state/EditorDialogViewState';
import { Page } from '../../common/state/Page';
import { PageEditorState } from '../../page-editor/state/PageEditorState';
import { PageInspectorState } from '../../page-inspector/state/PageInspectorState';
import { PanelTabType } from './PanelTabType';
import { RandomUtils } from '../../../utils/RandomUtils';
import { Story } from '../../common/state/Story';
import { StoryGraphState } from '../../story-graph/state/StoryGraphState';
import { TestState } from './TestState';

export interface PanelTab extends DuiPanelTab {
  type: PanelTabType;
}

export class EditorRootState {
  public story: Story;
  public storyGraphState = new StoryGraphState();
  public pageEditorStates: PageEditorState[] = [];
  public pageInspectorStates: PageInspectorState[] = [];
  public dockableUiState: DockableUIState;
  public dialogViewState = new EditorDialogViewState();
  public testStates: TestState[] = [];
  private tabMap = new Map<string, PanelTab>();

  constructor() {
    // Setup story - will be done elsewhere later and passed into constructor
    const story = new Story();
    const firstPage = new Page();
    firstPage.setName('First page');
    story.addPage(firstPage);
    this.story = story;

    this.dockableUiState = new DockableUIState();
    this.dockableUiState.addEventListener('close-tab', this.onCloseTab);
  }

  @action public startAddPage = () => {
    this.dialogViewState.showDialog(EditorDialogType.ADD_PAGE);
  };

  public addTab = (tabType: PanelTabType, panelId?: string) => {
    // Create the tab to pass to dockable ui state
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
      case PanelTabType.TEST:
        {
          const testState = new TestState(tab.id);
          this.testStates.push(testState);
        }
        break;
      case PanelTabType.PAGE_EDITOR:
        {
          const pageEditState = new PageEditorState(tab.id, this.story.pages);
          this.pageEditorStates.push(pageEditState);
        }
        break;
      case PanelTabType.PAGE_INSPECTOR:
        {
          const pageInspectorState = new PageInspectorState(tab.id, this.story.pages);
          this.pageInspectorStates.push(pageInspectorState);
        }
        break;
    }
  }

  private onCloseTab = (tabId: string) => {
    // Remove any states made for this tab
    const tab = this.tabMap.get(tabId);
    this.removeTabState(tab);

    // Then remove the tab from the map
    this.tabMap.delete(tabId);
  };

  private removeTabState(tab: PanelTab) {
    // Remove any lazy-loaded states for the tab just closed
    switch (tab.type) {
      case PanelTabType.TEST:
        this.testStates = this.testStates.filter((ts) => ts.tabId !== tab.id);
        break;
      case PanelTabType.PAGE_EDITOR:
        this.pageEditorStates = this.pageEditorStates.filter((pes) => pes.tabId !== tab.id);
        break;
      case PanelTabType.PAGE_INSPECTOR:
        this.pageInspectorStates = this.pageEditorStates.filter((pis) => pis.tabId !== tab.id);
        break;
    }
  }
}
