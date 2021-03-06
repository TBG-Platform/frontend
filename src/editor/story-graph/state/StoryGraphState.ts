import { Edge, FlowElement, Node } from 'react-flow-renderer';
import { action, observable } from 'mobx';

import { Page } from '../../common/state/Page';
import { RandomUtils } from '../../../utils/RandomUtils';
import { StoryEvent, StoryEventType, storyObserver } from '../../events/StoryEventObserver';
import { Vector } from '../../../utils/Vector';

export class StoryGraphState {
  @observable.ref public elements: FlowElement[] = [];
  private lastNodePos = new Vector(100, -80);

  constructor() {
    storyObserver.addGameEventListener(this.storyEventListener);
  }

  private storyEventListener = (event: StoryEvent) => {
    switch (event.type) {
      case StoryEventType.NEW_PAGE:
        this.onNewPage(event.page);
        break;
      case StoryEventType.RENAME_PAGE:
        this.onRenamePage(event.page);
        break;
      case StoryEventType.LINK_PAGE_ITEM:
        this.onLinkPages(event.itemId, event.fromId, event.toId);
        break;
      case StoryEventType.UNLINK_PAGE_ITEM:
        this.onUnlinkPages(event.itemId);
    }
  };

  @action private onNewPage(page: Page) {
    const type = this.elements.length ? 'default' : 'input';

    this.lastNodePos.add(new Vector(0, 100));

    const node: Node = {
      id: page.id,
      type,
      data: { label: page.name },
      position: { x: this.lastNodePos.x, y: this.lastNodePos.y },
    };

    this.elements.push(node);

    this.elements = [...this.elements];
  }

  @action public onRenamePage(page: Page) {
    this.elements = this.elements.map((el) => {
      if (el.id === page.id) {
        el.data = {
          ...el.data,
          label: page.name,
        };
      }

      return el;
    });
  }

  @action public onLinkPages(linkId: string, fromId: string, toId: string) {
    const edge: Edge = {
      id: linkId,
      source: fromId,
      target: toId,
    };

    this.elements.push(edge);

    this.elements = [...this.elements];
  }

  @action public onUnlinkPages(linkId: string) {
    this.elements = this.elements.filter((element) => element.id !== linkId);
  }
}
