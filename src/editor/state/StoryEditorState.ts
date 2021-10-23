import { action, observable } from 'mobx';
import { Story } from './Story';

export class StoryEditorState {
  @observable.ref public story?: Story;

  @action public createNewStory = () => {
    this.story = new Story();
  };
}
