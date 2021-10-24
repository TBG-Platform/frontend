import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { RandomUtils } from '../../utils/RandomUtils';
import { Vector } from '../../utils/Vector';

export class PageItem {
  public id = RandomUtils.createId();
  @observable public style: CSSProperties = {};
  @observable public text = 'text block';
  public position = new Vector();
  public scale = new Vector();

  constructor(pos: Vector, width = 0, height = 0) {
    this.setPosition(pos);
    this.setWidth(width);
    this.setHeight(height);
  }

  @action public setPosition(pos: Vector) {
    this.position = pos;
    this.style.left = pos.x + 'px';
    this.style.top = pos.y + 'px';
  }

  @action public setWidth(width: number) {
    this.style.width = width + 'px';
    this.scale.x = width;
  }

  @action public setHeight(height: number) {
    this.style.height = height + 'px';
    this.scale.y = height;
  }
}
