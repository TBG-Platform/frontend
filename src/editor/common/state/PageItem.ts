import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
import { action, observable } from 'mobx';

import { Page } from './Page';
import { RandomUtils } from '../../../utils/RandomUtils';
import { TextSettings } from './TextSettings';

export class PageItem {
  public id = RandomUtils.createId();
  @observable public settings: CSSProperties = {};
  @observable public textSettings = new TextSettings();
  @observable.ref public left: string;
  @observable.ref public top: string;
  @observable.ref public width: string;
  @observable.ref public height: string;
  @observable.ref public linkedPage?: Page;

  constructor(left = '0', top = '0', width = '0', height = '0') {
    this.setLeft(left);
    this.setTop(top);
    this.setWidth(width);
    this.setHeight(height);
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

  @action public setLinkedPage = (page: Page) => {
    this.linkedPage = page;
  };

  @action public unlinkPage = () => {
    this.linkedPage = undefined;
  };
}
