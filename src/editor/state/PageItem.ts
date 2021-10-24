import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { RandomUtils } from '../../utils/RandomUtils';
import { Vector } from '../../utils/Vector';

export class PageItem {
  public id = RandomUtils.createId();
  @observable public style: CSSProperties = {};
  @observable public text = 'text block';
  @observable public left: number;
  @observable public top: number;
  @observable public width: number;
  @observable public height: number;

  constructor(pos: Vector, width = 0, height = 0) {
    this.setPosition(pos);
    this.setWidth(width);
    this.setHeight(height);
  }

  @action public setPosition(pos: Vector) {
    this.left = pos.x;
    this.top = pos.y;
    this.style.left = pos.x + 'px';
    this.style.top = pos.y + 'px';
  }

  @action public setLeft = (left: number) => {
    this.left = left;
    this.style.left = left + 'px';
  };

  @action public setTop = (top: number) => {
    this.top = top;
    this.style.top = top + 'px';
  };

  @action public setWidth = (width: number) => {
    this.width = width;
    this.style.width = width + 'px';
  };

  @action public setHeight = (height: number) => {
    this.height = height;
    this.style.height = height + 'px';
  };
}
