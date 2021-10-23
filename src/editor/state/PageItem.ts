import { observable } from 'mobx';

export class PageItem {
  @observable public width: number;
  @observable public height: number;

  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }
}
