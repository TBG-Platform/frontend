import { action, observable } from 'mobx';

export enum DetailsPanelFocus {
  NONE = 'none',
  PAGE_ITEM = 'page-item',
}

export class DetailsPanelState {
  @observable public focus = DetailsPanelFocus.NONE;
  @observable public width = 300;

  @action public setFocus(focus: DetailsPanelFocus) {
    this.focus = focus;
  }

  @action public setWidth = (width: number) => {
    this.width = width;
  };
}
