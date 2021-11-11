import { action, observable } from 'mobx';

export enum WebsitePage {
  HOME = 'home',
  LIBRARY = 'library',
  MY_STORIES = 'my-stories',
  LOGIN = 'login',
}

export class WebsiteRootState {
  @observable.ref public page = WebsitePage.HOME;

  @action public setPage(page: WebsitePage) {
    this.page = page;
  }
}
