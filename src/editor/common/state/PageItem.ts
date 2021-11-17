import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
import { action, observable } from 'mobx';

import { Page } from './Page';
import { PageItemModel } from '../model/StoryModel';
import { RandomUtils } from '../../../utils/RandomUtils';

export class PageItem {
  public id = RandomUtils.createId();
  @observable public settings: CSSProperties = {};
  @observable.ref public text = '';
  @observable.ref public left: string;
  @observable.ref public top: string;
  @observable.ref public width: string;
  @observable.ref public height: string;
  @observable.ref public linkedPage?: Page;
  public linkedPageId = '';

  constructor(left = '0', top = '0', width = '0', height = '0') {
    this.setLeft(left);
    this.setTop(top);
    this.setWidth(width);
    this.setHeight(height);
  }

  public static fromModel(model: PageItemModel): PageItem {
    const item = new PageItem();

    const extractCssValue = (strVal: any, delimeter: string) => {
      return (strVal as string).split(delimeter)[0];
    };

    item.id = model.id;
    item.setLeft(extractCssValue(model.settings.left, '%'));
    item.setTop(extractCssValue(model.settings.top, '%'));
    item.setWidth(extractCssValue(model.settings.width, '%'));
    item.setHeight(extractCssValue(model.settings.height, '%'));
    item.linkedPageId = model.linkedPageId;

    return item;
  }

  public toModel(): PageItemModel {
    return {
      id: this.id,
      settings: this.settings,
      text: this.text,
      linkedPageId: this.linkedPage?.id ?? '',
    };
  }

  @action public setText = (text: string) => {
    this.text = text;
  };

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
    this.linkedPageId = page.id;
  };

  @action public unlinkPage = () => {
    this.linkedPage = undefined;
    this.linkedPageId = '';
  };
}
