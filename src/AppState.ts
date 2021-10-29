import { DockableUIState } from './editor/state/dockable-ui/DockableUIState';
import { PanelTabType } from './editor/state/panels/PanelTabType';
import { PanelViewState } from './editor/state/panels/PanelViewState';
import { StoryEditorState } from './editor/state/StoryEditorState';

export class AppState {
  public storyEditorState?: StoryEditorState;
  public panelViewState: PanelViewState;
  public dockableUiState: DockableUIState;

  constructor() {
    this.dockableUiState = new DockableUIState();
    this.panelViewState = new PanelViewState();
    this.storyEditorState = new StoryEditorState();
    this.storyEditorState.createNewStory();
  }

  public addTab = (panelId: string, tabType: PanelTabType) => {
    // Create the tab to pass to dockable ui state
    const tab = this.panelViewState.makeTab(tabType);
    // Give it to dockable ui to render
    this.dockableUiState.addPanelTab(panelId, tab);
  };
}
