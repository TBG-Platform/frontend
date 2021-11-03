import { action, observable } from 'mobx';

import { EditorDialogType } from './EditorDialogTypes';

export class EditorDialogViewState {
  @observable.ref public activeDialog?: EditorDialogType;

  @action public showDialog(dialog: EditorDialogType) {
    this.activeDialog = dialog;
  }

  @action public hideDialog = () => {
    this.activeDialog = undefined;
  };
}
