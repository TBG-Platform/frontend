import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
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
    this.settings.left = pos.x + '%';
    this.settings.top = pos.y + '%';
  }

  @action public setLeft = (left: number) => {
    this.left = left;
    this.settings.left = left + '%';
  };

  @action public setTop = (top: number) => {
    this.top = top;
    this.settings.top = top + '%';
  };

  @action public setWidth = (width: number) => {
    this.width = width;
    this.settings.width = width + 'px';
  };

  @action public setHeight = (height: number) => {
    this.height = height;
    this.settings.height = height + 'px';
  };

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };
}
