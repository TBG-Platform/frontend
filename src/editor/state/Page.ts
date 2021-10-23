import { action, observable } from 'mobx';
import { RandomUtils } from '../../utils/RandomUtils';
import { Vector } from '../../utils/Vector';
import { PageItem } from './PageItem';

export class Page {
  public id = RandomUtils.createId();
  @observable public name = 'Untitled_page';
  @observable public items: PageItem[] = [];
  @observable.ref public selectedItem?: PageItem;

  @action public setName = (name: string) => {
    this.name = name;
  };

  public isItemSelected(itemId: string) {
    return this.selectedItem && this.selectedItem.id === itemId;
  }

  @action public selectItem(itemId: string) {
    this.selectedItem = this.items.find((item) => item.id === itemId);
  }

  @action public addTextBlock(pos: Vector) {
    pos.print();

    const textBlock = new PageItem(pos, 50, 25);

    this.items.push(textBlock);

    this.selectedItem = textBlock;
  }
}
