import { action, observable } from 'mobx';
import { RandomUtils } from '../../utils/RandomUtils';
import { PageItem } from './PageItem';

export class Page {
  public id = RandomUtils.createId();
  @observable public name = 'Untitled_page';
  @observable public items: PageItem[] = [];

  @action public setName = (name: string) => {
    this.name = name;
  };
}
