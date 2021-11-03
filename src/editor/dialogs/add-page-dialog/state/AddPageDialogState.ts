import { action, observable } from 'mobx';

export class AddPageDialogState {
  @observable public pageName = '';

  @action public setName(name: string) {
    this.pageName = name;
  }
}
