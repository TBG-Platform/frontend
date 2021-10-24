import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { RandomUtils } from '../../utils/RandomUtils';
import { Vector } from '../../utils/Vector';

export class PageItem {
  public id = RandomUtils.createId();
  @observable public style: CSSProperties = {};
  @observable public text = 'text block';

  constructor(pos: Vector, width = 0, height = 0) {
    this.setPosition(pos);
    this.setWidth(width);
    this.setHeight(height);
  }

  @action public setPosition(pos: Vector) {
    this.style.left = pos.x + 'px';
    this.style.top = pos.y + 'px';

    console.log('setPos', pos);
  }

  @action public setWidth(width: number) {
    this.style.width = width + '%';
  }

  @action public setHeight(height: number) {
    this.style.height = height + '%';
  }

  public onMouseMove = (e: MouseEvent) => {};
}
