import React from 'react';
import { action, observable } from 'mobx';

import { Page } from '../../common/state/Page';
import { PanelTab } from '../../editor-root/state/EditorRootState';
import { TabBaseState } from '../../editor-root/state/TabBaseState';
import { Vector } from '../../../utils/Vector';
import { keyboardObserver } from '../../../utils/KeyboardObserver';

export class PageEditorState extends TabBaseState {
  @observable public pages: Page[];
  @observable.ref public selectedPage: Page;
  @observable.ref public pageDiv: HTMLDivElement;

  private addingPageItem = false;

  constructor(tab: PanelTab, pages: Page[]) {
    super(tab);

    this.pages = pages;
    this.selectedPage = this.pages[0];
  }

  public setPageDiv(div: HTMLDivElement) {
    this.pageDiv = div;
  }

  @action public setSelectedPage = (page: Page) => {
    this.selectedPage = page;
  };

  public toggleAddingPageWidget = () => {
    this.addingPageItem = !this.addingPageItem;

    if (this.addingPageItem) {
      keyboardObserver.addSpecificKeyListener(this.toggleAddingPageWidget, ['Escape']);
      this.pageDiv.style.cursor = 'pointer';
    } else {
      keyboardObserver.removeSpecificKeyListener(this.toggleAddingPageWidget, ['Escape']);
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
    this.selectedPage.addPageItem(pos);
  };

  public onPageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.addingPageItem) {
      this.addPageItem(new Vector(e.clientX, e.clientY));
      this.toggleAddingPageWidget();
    } else {
      this.selectedPage?.deselectItem();
    }
  };
}
