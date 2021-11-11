import { observable } from 'mobx';

import { EditorRootState } from './editor/editor-root/state/EditorRootState';

export enum AppScreen {
  WEBSITE = 'website',
  EDITOR = 'editor',
}

export class AppState {
  @observable.ref public appScreen = AppScreen.WEBSITE;

  public editorRootState = new EditorRootState();
}
