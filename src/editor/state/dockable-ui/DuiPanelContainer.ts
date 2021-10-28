import { action, observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';

export enum DuiPanelContainerFlow {
  ROW = 'row',
  COLUMN = 'column',
}

export interface DuiPanelContainerChild {
  id: string;
  basis: number;
}

export class DuiPanelContainer {
  public id: string;
  public parentId: string;
  @observable public flow = DuiPanelContainerFlow.ROW;
  @observable public children: DuiPanelContainerChild[] = [];

  private containerDiv?: HTMLDivElement;

  constructor(id: string, parentId: string) {
    this.id = id;
    this.parentId = parentId;
  }

  public setDiv(div: HTMLDivElement) {
    this.containerDiv = div;
  }

  @action public addChild(childId: string) {
    this.children.push({
      id: childId,
      basis: 100,
    });

    this.rebaseChildren();
  }

  @action public insertChild(childId: string, insertAfterId: string) {
    const child: DuiPanelContainerChild = {
      id: childId,
      basis: 100,
    };

    const insertIdx = this.children.findIndex((ch) => ch.id === insertAfterId);
    this.children.splice(insertIdx, 0, child);

    this.rebaseChildren();
  }

  @action public removeChild(id: string) {
    this.children = this.children.filter((ch) => ch.id !== id);

    this.rebaseChildren();
  }

  @action public rebaseChildren() {
    this.children.forEach((ch) => (ch.basis = 100 / this.children.length));
  }

  @action public resizeChildren(e: MouseEvent, resizerIndex: number, resizer: HTMLDivElement) {
    /**
     * Need to know:
     * - the index of the resizer, which is the index of the child to its left
     *   there will always be a child to right at index + 1
     *
     * - how many pixels the mouse has moved, and in which direction
     *
     * can then:
     * - get mouse delta as percentage of container; flex basis change
     * - based on direction, add to one panel and subtract from another
     *
     * to do:
     * - panels should have minimum dimensions...
     */

    // Gather required data from mouse, resizer and panel
    let mousePos = e.clientX;
    const contRect = this.containerDiv.getBoundingClientRect();
    let panelStart = contRect.left;
    let panelMax = contRect.width;
    const resizerRect = resizer.getBoundingClientRect();
    let resizerPos = resizerRect.left + resizerRect.width * 0.5;

    // Adjust above data based on flow direction
    if (this.flow === DuiPanelContainerFlow.COLUMN) {
      mousePos = e.clientY;
      panelStart = contRect.top;
      panelMax = contRect.height;
      resizerPos = resizerRect.top + resizerRect.height * 0.5;
    }

    // Find distance mouse has moved from resizer pos as a percentage of container size
    const mouseDelta = mousePos - resizerPos;
    const deltaPercent = (mouseDelta / panelMax) * 100;
    // delta percent is the rate of change in terms of flex basis

    const childBefore = this.children[resizerIndex];
    const childAfter = this.children[resizerIndex + 1];

    childBefore.basis += deltaPercent;
    childAfter.basis -= deltaPercent;

    //console.log('mouseDelta', mouseDelta);
    //console.log('deltaPercent', deltaPercent);
  }
}
