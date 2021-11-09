import { action, observable } from 'mobx';

import { PageItem } from './PageItem';
import { RandomUtils } from '../../../utils/RandomUtils';
import { StoryEventType, storyObserver } from '../../events/StoryEventObserver';
import { Vector } from '../../../utils/Vector';
import { keyboardObserver } from '../../../utils/KeyboardObserver';

export class Page {
  public id = RandomUtils.createId();
  @observable public name = 'Untitled_page';
  @observable public items: PageItem[] = [];
  @observable.ref public selectedItem?: PageItem;

  constructor() {
    keyboardObserver.addSpecificKeyListener(this.deleteSelectedItem, ['Delete']);
  }

  @action public setName = (name: string) => {
    this.name = name;
  };

  public finishSetName = () => {
    // Once finished setting the name, fire page name updated story event
    storyObserver.fireEvent({ type: StoryEventType.RENAME_PAGE, page: this });
  };

  public isItemSelected(itemId: string) {
    return this.selectedItem && this.selectedItem.id === itemId;
  }

  @action public selectItem(itemId: string) {
    this.selectedItem = this.items.find((item) => item.id === itemId);
  }

  @action public addTextBlock(pos: Vector) {
    // Sizing is in percent
    const textBlock = new PageItem(pos.x.toFixed(3), pos.y.toFixed(3), '40', '20');

    this.items.push(textBlock);

    this.selectedItem = textBlock;
  }

  @action public deleteSelectedItem = () => {
    if (this.selectedItem) {
      this.items = this.items.filter((item) => item.id !== this.selectedItem.id);
      this.selectedItem = undefined;
    }
  };
}
