import { action, observable } from 'mobx';

export enum EditorDialogType {
  ADD_PAGE = 'add-page',
  SAVE_LAYOUT = 'save-layout',
  MANAGE_LAYOUTS = 'manage-layouts',
  GAME_PLAYER = 'game-player',
}

export class EditorDialogViewState {
  @observable.ref public activeDialog?: EditorDialogType;

  @action public showDialog(dialog: EditorDialogType) {
    this.activeDialog = dialog;
  }

  @action public hideDialog = () => {
    this.activeDialog = undefined;
  };
}
