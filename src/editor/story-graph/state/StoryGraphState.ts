import { FlowElement, Node } from 'react-flow-renderer';
import { action, observable } from 'mobx';

import { Page } from '../../common/state/Page';
import { StoryEvent, StoryEventType, storyObserver } from '../../events/StoryEventObserver';

export class StoryGraphState {
  @observable.ref public elements: FlowElement[] = [];

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
    }
  };

  private onNewPage(page: Page) {
    const type = this.elements.length ? 'default' : 'input';

    const node: Node = {
      id: page.id,
      type,
      data: { label: page.name },
      position: { x: 0, y: 0 },
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

  @action public addPageNode(id: string, name: string) {
    // Only first node is of type input
    const type = this.elements.length ? 'default' : 'input';

    const node: Node = {
      id,
      type,
      data: { label: name },
      position: { x: 70, y: 30 },
    };

    this.elements.push(node);

    // Must overwrite elements to update renderer
    this.elements = this.elements.map((el) => el);
  }
}
