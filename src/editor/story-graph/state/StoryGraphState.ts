import { action, observable } from 'mobx';
import { FlowElement, Node } from 'react-flow-renderer';

export class StoryGraphState {
  @observable.ref public elements: FlowElement[] = [];

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

  @action public updatePageNodeName(id: string, name: string) {
    this.elements = this.elements.map((el) => {
      if (el.id === id) {
        el.data = {
          ...el.data,
          label: name,
        };
      }

      return el;
    });
  }
}
