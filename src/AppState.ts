import { DockableUIState } from './editor/state/dockable-ui/DockableUIState';
import { DuiPanelTab } from './editor/state/dockable-ui/DuiPanel';
import { PanelTabType } from './editor/state/panels/PanelTabType';
import { StoryEditorState } from './editor/state/StoryEditorState';
import { RandomUtils } from './utils/RandomUtils';

export interface PanelTab extends DuiPanelTab {
  type: PanelTabType;
}

export class AppState {
  public storyEditorState?: StoryEditorState;
  public dockableUiState: DockableUIState;

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

    // Give it to dockable ui to render
    this.dockableUiState.addPanelTab(panelId, tab);
  };

  public getTabType(id: string): PanelTabType | undefined {
    return this.tabMap.get(id)?.type;
  }
}
