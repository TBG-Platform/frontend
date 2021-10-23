import { action, observable } from 'mobx';
import { RandomUtils } from '../../utils/RandomUtils';

export class Page {
  public id = RandomUtils.createId();
  @observable public name = 'Untitled_page';

  @action public setName = (name: string) => {
    this.name = name;
  };
}
