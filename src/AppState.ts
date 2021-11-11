import { observable } from 'mobx';

import { EditorRootState } from './editor/editor-root/state/EditorRootState';
import { WebsiteRootState } from './website/website-root/state/WebsiteRootState';

export enum AppScreen {
  WEBSITE = 'website',
  EDITOR = 'editor',
}

export class AppState {
  @observable.ref public appScreen = AppScreen.WEBSITE;

  public websiteRootState = new WebsiteRootState();
  public editorRootState = new EditorRootState();
}
