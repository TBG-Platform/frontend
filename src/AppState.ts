import { DockableUIState } from './editor/state/dockable-ui/DockableUIState';
import { DuiPanelTab } from './editor/state/dockable-ui/DuiPanel';
import { PanelTabType } from './editor/state/panels/PanelTabType';
import { TestState } from './editor/state/panels/TestState';
import { StoryEditorState } from './editor/state/StoryEditorState';
import { RandomUtils } from './utils/RandomUtils';

export interface PanelTab extends DuiPanelTab {
  type: PanelTabType;
}

export class AppState {
  public storyEditorState?: StoryEditorState;
  public dockableUiState: DockableUIState;
  public testStates: TestState[] = [];
  private tabMap = new Map<string, PanelTab>();

  constructor() {
    this.dockableUiState = new DockableUIState();
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
    this.createTabState(tab.id, tabType);

    // Give it to dockable ui to render
    this.dockableUiState.addPanelTab(panelId, tab);
  };

  public getTab(id: string): PanelTab | undefined {
    return this.tabMap.get(id);
  }

  private createTabState(tabId: string, tabType: PanelTabType) {
    // Create whatever state this tab component requires
    switch (tabType) {
      case PanelTabType.TEST:
        const testState = new TestState(tabId);
        this.testStates.push(testState);
        break;
    }
  }
}
