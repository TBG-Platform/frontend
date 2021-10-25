import { action, observable } from 'mobx';

export enum DetailsPanelFocus {
  PAGE_ITEM = 'page-item',
  STORY_GRAPH = 'story-graph',
}

export class DetailsPanelState {
  @observable public focus = DetailsPanelFocus.PAGE_ITEM;
  @observable public width = 300;

  public isFocusSelected(focus: DetailsPanelFocus) {
    return this.focus === focus;
  }

  @action public setFocus(focus: DetailsPanelFocus) {
    this.focus = focus;
  }

  @action public setWidth = (width: number) => {
    this.width = width;
  };
}
