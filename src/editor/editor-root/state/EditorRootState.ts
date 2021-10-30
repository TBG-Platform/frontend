import { RandomUtils } from '../../../utils/RandomUtils';
import { DockableUIState } from '../../dockable-ui/state/DockableUIState';
import { DuiPanelTab } from '../../dockable-ui/state/DuiPanel';
import { StoryEditorState } from '../../state/StoryEditorState';
import { PanelTabType } from './PanelTabType';
import { TestState } from './TestState';

export interface PanelTab extends DuiPanelTab {
  type: PanelTabType;
}

export class EditorRootState {
  public storyEditorState: StoryEditorState;
  public dockableUiState: DockableUIState;
  public testStates: TestState[] = [];
  private tabMap = new Map<string, PanelTab>();

  constructor() {
    // Setup dockable ui state
    this.dockableUiState = new DockableUIState();
    this.dockableUiState.addEventListener('close-tab', this.onCloseTab);

    this.storyEditorState = new StoryEditorState();
    this.storyEditorState.createNewStory();
  }

  public addTab = (panelId: string, tabType: PanelTabType) => {
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
    this.dockableUiState.addPanelTab(panelId, tab);
  };

  public getTab(id: string): PanelTab | undefined {
    return this.tabMap.get(id);
  }

  private createTabState(tab: PanelTab) {
    // Create whatever state this tab component requires
    switch (tab.type) {
      case PanelTabType.TEST:
        const testState = new TestState(tab.id);
        this.testStates.push(testState);
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
    switch (tab.type) {
      case PanelTabType.TEST:
        this.testStates = this.testStates.filter((ts) => ts.tabId !== tab.id);
        break;
    }
  }
}
