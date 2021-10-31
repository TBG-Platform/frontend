import { observable } from 'mobx';
import { Page } from '../../state/Page';

export class PageInspectorState {
  public tabId: string;
  @observable public pages: Page[];

  constructor(tabId: string, pages: Page[]) {
    this.tabId = tabId;
    this.pages = pages;

    // TODO - editorRootstate should detect which page is being edited
    // and send that in this constructor when creating the tab
  }
}
