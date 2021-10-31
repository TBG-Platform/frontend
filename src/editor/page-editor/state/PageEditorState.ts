import { action, observable } from 'mobx';
import { keyboardObserver } from '../../../utils/KeyboardObserver';
import { Vector } from '../../../utils/Vector';
import { Page } from '../../state/Page';

export class PageEditorState {
  public tabId: string;
  @observable public pages: Page[];
  @observable.ref public selectedPage: Page;
  public pageDiv: HTMLDivElement;

  private addingPageWidget = false;

  constructor(tabId: string, pages: Page[]) {
    this.tabId = tabId;
    this.pages = pages;
    this.selectedPage = this.pages[0];
  }

  public setPageDiv(div: HTMLDivElement) {
    this.pageDiv = div;
  }

  public toggleAddingPageWidget = () => {
    this.addingPageWidget = !this.addingPageWidget;

    if (this.addingPageWidget) {
      keyboardObserver.addSpecificKeyListener(this.toggleAddingPageWidget, ['Escape']);
      this.pageDiv.addEventListener('click', this.onPageClick);
      this.pageDiv.style.cursor = 'pointer';
    } else {
      keyboardObserver.removeSpecificKeyListener(this.toggleAddingPageWidget, ['Escape']);
      this.pageDiv.removeEventListener('click', this.onPageClick);
      this.pageDiv.style.cursor = 'default';
    }
  };

  @action public addPageItem = (mousePos: Vector) => {
    const pageRect = this.pageDiv.getBoundingClientRect();
    const pagePos = new Vector(pageRect.left, pageRect.top);
    mousePos.sub(pagePos);

    // Position on page as percentage
    const leftPercent = (mousePos.x / pageRect.width) * 100;
    const rightPerent = (mousePos.y / pageRect.height) * 100;

    const pos = new Vector(leftPercent, rightPerent);
    this.selectedPage.addTextBlock(pos);
  };

  private onPageClick = (e: MouseEvent) => {
    this.addPageItem(new Vector(e.clientX, e.clientY));

    this.toggleAddingPageWidget();
  };
}
