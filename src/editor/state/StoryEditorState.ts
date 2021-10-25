import { action, observable } from 'mobx';
import { keyboardObserver } from '../../utils/KeyboardObserver';
import { pageDisplayUtil } from '../../utils/PageDisplayUtils';
import { Vector } from '../../utils/Vector';
import { DetailsPanelFocus, DetailsPanelState } from './DetailsPanelState';
import { Page } from './Page';
import { Story } from './Story';
import { StoryGraphState } from './StoryGraphState';

export class StoryEditorState {
  @observable.ref public story?: Story;
  @observable public addingTextBlock = false;
  public detailsPanelState = new DetailsPanelState();
  public storyGraphState = new StoryGraphState();

  @action public createNewStory = () => {
    const story = new Story();

    // Create the first page for this story
    const startPage = new Page();
    startPage.setName('First page');
    story.addPage(startPage);
    story.selectPage(startPage.id);

    // Update story graph with new page
    this.storyGraphState.addPageNode(startPage.id, startPage.name);

    this.story = story;
  };

  @action public onRenamedPage = () => {
    const page = this.story.selectedPage;
    this.storyGraphState.updatePageNodeName(page.id, page.name);
  };

  @action public toggleAddTextBlock = () => {
    this.addingTextBlock = !this.addingTextBlock;

    const pageDisplay = pageDisplayUtil.getPageDisplay();
    if (this.addingTextBlock) {
      keyboardObserver.addSpecificKeyListener(this.handleKeyPress, ['Escape']);
      pageDisplay.addEventListener('click', this.onClick);
      pageDisplay.style.cursor = 'pointer';
    } else {
      keyboardObserver.removeSpecificKeyListener(this.handleKeyPress, ['Escape']);
      pageDisplay.removeEventListener('click', this.onClick);
      pageDisplay.style.cursor = 'default';
    }
  };

  @action public addPageItem = (mousePos: Vector) => {
    const pageRect = pageDisplayUtil.getPageDisplayBounds();
    const pagePos = new Vector(pageRect.left, pageRect.top);
    mousePos.sub(pagePos);

    // Position as percentage value
    const leftPercent = (mousePos.x / pageRect.width) * 100;
    const topPercent = (mousePos.y / pageRect.height) * 100;

    const pos = new Vector(leftPercent, topPercent);
    this.story.selectedPage.addTextBlock(pos);
    this.detailsPanelState.setFocus(DetailsPanelFocus.PAGE_ITEM);
  };

  private onClick = (e: MouseEvent) => {
    this.addPageItem(new Vector(e.clientX, e.clientY));

    // No longer adding text block
    this.toggleAddTextBlock();
  };

  @action private handleKeyPress = (key: string) => {
    // Stop adding text block
    this.toggleAddTextBlock();
  };
}
