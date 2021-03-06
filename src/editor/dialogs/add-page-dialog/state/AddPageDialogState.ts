import { action, observable } from 'mobx';

export class AddPageDialogState {
  @observable public pageName = '';
  @observable public isValid = true;
  private firstValidation = false;

  @action public setName(name: string) {
    this.pageName = name;

    if (this.firstValidation) {
      this.validate();
    }
  }

  @action public validate() {
    this.firstValidation = true;
    this.isValid = this.pageName.length > 1;
  }
}
