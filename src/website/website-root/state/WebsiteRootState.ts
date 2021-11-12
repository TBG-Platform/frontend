import { action, observable } from 'mobx';

import { MyStoriesPageState } from '../../my-stories-page/state/MyStoriesPageState';

export enum WebsitePage {
  HOME = 'home',
  LIBRARY = 'library',
  MY_STORIES = 'my-stories',
  LOGIN = 'login',
}

export class WebsiteRootState {
  @observable.ref public page = WebsitePage.MY_STORIES;
  public myStoriesState?: MyStoriesPageState;

  @action public toPage(page: WebsitePage) {
    // Unload all page states
    this.unloadPageStates();

    // Then load state for this page
    switch (page) {
      case WebsitePage.MY_STORIES:
        this.myStoriesState = new MyStoriesPageState();
        break;
    }

    this.page = page;
  }

  private unloadPageStates() {
    this.myStoriesState = undefined;
  }
}
