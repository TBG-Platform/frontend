import { DockableUIState } from './editor/state/dockable-ui/DockableUIState';
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
}
