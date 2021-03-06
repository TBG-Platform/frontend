import { observable } from 'mobx';

import { EditorRootState } from './editor/editor-root/state/EditorRootState';
import { WebsitePage, WebsiteRootState } from './website/website-root/state/WebsiteRootState';

export enum AppScreen {
  WEBSITE = 'website',
  EDITOR = 'editor',
}

export class AppState {
  @observable.ref public appScreen = AppScreen.WEBSITE;

  public websiteRootState = new WebsiteRootState();
  public editorRootState = new EditorRootState();

  constructor() {
    this.devOnlyRoute();
  }

  // Used in development; quick way to route to a location in the app
  private devOnlyRoute() {
    this.appScreen = AppScreen.EDITOR;
    //this.websiteRootState.toPage(WebsitePage.MY_STORIES);
  }
}
