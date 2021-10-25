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
  @observable public left: string;
  @observable public top: string;
  @observable public width: string;
  @observable public height: string;

  constructor(left = '0', top = '0', width = '0', height = '0') {
    this.setLeft(left);
    this.setTop(top);
    this.setWidth(width);
    this.setHeight(height);
  }

  @action public setPosition(pos: Vector) {
    this.setLeft(pos.x.toFixed(3));
    this.setTop(pos.y.toFixed(3));
  }

  @action public setLeft = (left: string) => {
    this.left = left;
    this.settings.left = left + '%';
  };

  @action public setTop = (top: string) => {
    this.top = top;
    this.settings.top = top + '%';
  };

  @action public setWidth = (width: string) => {
    this.width = width;
    this.settings.width = width + '%';
  };

  @action public setHeight = (height: string) => {
    this.height = height;
    this.settings.height = height + '%';
  };

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };
}
