import { action, observable } from 'mobx';
import { keyboardObserver } from '../../utils/KeyboardObserver';
import { Vector } from '../../utils/Vector';
import { Page } from './Page';
import { Story } from './Story';

export enum DetailsPanelFocus {
  NONE = 'none',
  PAGE_ITEM = 'page-item',
}

export class StoryEditorState {
  @observable.ref public story?: Story;
  @observable public detailsPanelFocus = DetailsPanelFocus.NONE;
  @observable public detailsPanelWidth = 300;
  @observable public addingTextBlock = false;

  public pageDisplay?: HTMLDivElement;

  @action public createNewStory = () => {
    const story = new Story();

    const startPage = new Page();
    startPage.setName('First page');
    story.addPage(startPage);
    story.selectPage(startPage.id);

    this.story = story;
  };

  public setPageDisplay(pageDisplayDiv: HTMLDivElement) {
    this.pageDisplay = pageDisplayDiv;
  }

  @action public setDetailsPanelFocus(focus: DetailsPanelFocus) {
    this.detailsPanelFocus = focus;
  }

  @action public setDetailsPanelWidth = (width: number) => {
    this.detailsPanelWidth = width;
  };

  @action public toggleAddTextBlock = () => {
    this.addingTextBlock = !this.addingTextBlock;

    if (this.addingTextBlock) {
      keyboardObserver.addSpecificKeyListener(this.handleKeyPress, ['Escape']);
      this.pageDisplay.addEventListener('click', this.addTextBlock);
      this.pageDisplay.style.cursor = 'pointer';
    } else {
      keyboardObserver.removeSpecificKeyListener(this.handleKeyPress, ['Escape']);
      this.pageDisplay.removeEventListener('click', this.addTextBlock);
      this.pageDisplay.style.cursor = 'default';
    }
  };

  @action private addTextBlock = (e: MouseEvent) => {
    // Get position to add text block
    const mousePos = new Vector(e.clientX, e.clientY);

    const pageRect = this.pageDisplay.getBoundingClientRect();
    const pagePos = new Vector(pageRect.left, pageRect.top);
    mousePos.sub(pagePos);

    // Position as percentage value
    const leftPercent = (mousePos.x / pageRect.width) * 100;
    const topPercent = (mousePos.y / pageRect.height) * 100;

    const pos = new Vector(leftPercent, topPercent);
    this.story.selectedPage.addTextBlock(pos);
    this.setDetailsPanelFocus(DetailsPanelFocus.PAGE_ITEM);

    // No longer adding text block
    this.toggleAddTextBlock();
  };

  @action private handleKeyPress = (key: string) => {
    // Stop adding text block
    this.toggleAddTextBlock();
  };
}
