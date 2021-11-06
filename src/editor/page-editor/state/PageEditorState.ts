import { action, observable } from 'mobx';

import { Page } from '../../common/state/Page';
import { Vector } from '../../../utils/Vector';
import { keyboardObserver } from '../../../utils/KeyboardObserver';
import { TabBaseState } from '../../editor-root/state/TabBaseState';
import { PanelTabType } from '../../editor-root/state/PanelTabType';
import { PanelTab } from '../../editor-root/state/EditorRootState';

export class PageEditorState extends TabBaseState {
  @observable public pages: Page[];
  @observable.ref public selectedPage: Page;
  public pageDiv: HTMLDivElement;

  private addingPageWidget = false;

  constructor(tab: PanelTab, pages: Page[]) {
    super(tab);

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
