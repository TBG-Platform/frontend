import { observable } from 'mobx';
import { Page } from '../../state/Page';

export class PageEditorState {
  public tabId: string;
  @observable public pages: Page[];
  @observable.ref public selectedPage: Page;

  constructor(tabId: string, pages: Page[]) {
    this.tabId = tabId;
    this.pages = pages;
    this.selectedPage = this.pages[0];
  }
}
