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
      position: { x: 0, y: 0 },
    };

    this.elements.push(node);

    // Must overwrite elements to update renderer
    this.elements = this.elements.map((el) => el);
  }
}
