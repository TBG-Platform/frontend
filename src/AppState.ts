import { PanelViewState } from './editor/state/panels/PanelViewState';
import { StoryEditorState } from './editor/state/StoryEditorState';

export class AppState {
  public storyEditorState?: StoryEditorState;
  public panelViewState: PanelViewState;

  constructor() {
    this.panelViewState = new PanelViewState();
    this.storyEditorState = new StoryEditorState();
    this.storyEditorState.createNewStory();
  }
}
