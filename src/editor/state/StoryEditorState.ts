import { action, observable } from 'mobx';
import { Page } from './Page';
import { Story } from './Story';

export class StoryEditorState {
  @observable.ref public story?: Story;

  @action public createNewStory = () => {
    const story = new Story();

    const startPage = new Page();
    story.addPage(startPage);
    story.selectPage(startPage.id);

    this.story = story;
  };
}
