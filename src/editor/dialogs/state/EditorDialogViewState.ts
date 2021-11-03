import { action, observable } from 'mobx';

import { EditorDialogType } from './EditorDialogTypes';

export class EditorDialogViewState {
  @observable.ref public activeDialog?: EditorDialogType;

  @action showDialog(dialog: EditorDialogType) {
    this.activeDialog = dialog;
  }

  @action hideDialog = () => {
    this.activeDialog = undefined;
  };
}
