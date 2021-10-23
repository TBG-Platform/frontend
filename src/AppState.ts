import { StoryEditorState } from './editor/state/StoryEditorState';

export class AppState {
  public storyEditorState?: StoryEditorState;

  constructor() {
    this.storyEditorState = new StoryEditorState();
  }
}
