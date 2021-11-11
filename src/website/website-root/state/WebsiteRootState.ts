import { observable } from 'mobx';

export enum WebsitePage {
  HOME = 'home',
  LIBRARY = 'library',
  MY_STORIES = 'my-stories',
}

export class WebsiteRootState {
  @observable.ref public page = WebsitePage.HOME;
}
