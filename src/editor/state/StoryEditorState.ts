import { action, observable } from 'mobx';
import { keyboardObserver } from '../../utils/KeyboardObserver';
import { Vector } from '../../utils/Vector';
import { Page } from './Page';
import { Story } from './Story';

export class StoryEditorState {
  @observable.ref public story?: Story;
  @observable public addingTextBlock = false;

  private pageDisplay?: HTMLDivElement;

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

    if (this.addingTextBlock) {
      this.pageDisplay = this.addingTextBlock
        ? (document.getElementById('page-display') as HTMLDivElement)
        : undefined;
      document.addEventListener('click', this.onMouseClick);
    } else {
      this.pageDisplay = undefined;
      document.removeEventListener('click', this.onMouseClick);
    }
  };

  @action private handleKeyPress = (key: string) => {
    switch (key) {
      case 'Escape':
        this.addingTextBlock = false;
        break;
    }
  };

  private onMouseClick = (e: MouseEvent) => {
    console.log('clicked');

    // What to do with this click
    // TODO - potentially abstract this into EditorAction class
    if (this.addingTextBlock) {
    }
  };
}
