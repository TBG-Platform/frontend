import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { RandomUtils } from '../../utils/RandomUtils';
import { Vector } from '../../utils/Vector';
import { TextSettings } from './TextSettings';

export class PageItem {
  public id = RandomUtils.createId();
  @observable public settings: CSSProperties = {};
  @observable public textSettings = new TextSettings();
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
    this.settings.left = pos.x + 'px';
    this.settings.top = pos.y + 'px';
  }

  @action public setLeft = (left: number) => {
    this.left = left;
    this.settings.left = left + 'px';
  };

  @action public setTop = (top: number) => {
    this.top = top;
    this.settings.top = top + 'px';
  };

  @action public setWidth = (width: number) => {
    this.width = width;
    this.settings.width = width + 'px';
  };

  @action public setHeight = (height: number) => {
    this.height = height;
    this.settings.height = height + 'px';
  };
}
