import { action, observable } from 'mobx';
import { keyboardObserver } from '../../utils/KeyboardObserver';
import { Page } from './Page';
import { Story } from './Story';

export class StoryEditorState {
  @observable.ref public story?: Story;
  @observable public addingTextBlock = false;

  constructor() {
    keyboardObserver.addKeyListener(this.handleKeyPress);
  }

  @action public createNewStory = () => {
    const story = new Story();

    const startPage = new Page();
    startPage.setName('First page');
    story.addPage(startPage);
    story.selectPage(startPage.id);

    this.story = story;
  };

  @action public toggleAddTextBlock = () => {
    this.addingTextBlock = !this.addingTextBlock;
  };

  @action private handleKeyPress = (key: string) => {
    switch (key) {
      case 'Escape':
        this.addingTextBlock = false;
        break;
    }
  };
}
