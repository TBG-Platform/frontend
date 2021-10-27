import { action, observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';
import { Panel } from './Panel';

export enum PanelFlow {
  ROW = 'row',
  COLUMN = 'column',
}

export class PanelContainer {
  public id = RandomUtils.createId();
  public div?: HTMLDivElement;
  @observable public a?: Panel | PanelContainer;
  @observable public b?: Panel | PanelContainer;
  public flow = PanelFlow.ROW;
  @observable public basis: number = 50;

  public hasPanelB() {
    return this.b !== undefined;
  }

  public setDiv(div: HTMLDivElement) {
    this.div = div;
  }

  @action public setSplit(split: number) {
    if (this.a) {
      this.a.basis = split;
    }
    if (this.b) {
      this.b.basis = Math.abs(100 - split);
    }
  }

  @action public makePanelIntoContainer(panel: Panel, container: PanelContainer) {
    // Is this new container going into the a or b slot?
    if (this.a?.id === panel.id) {
      this.a = container;
    } else if (this.b?.id === panel.id) {
      this.b = container;
    }
  }
}

/**
 * NOTES
 *
 * The data model is starting to get really messy to use and make sense of.
 * Needs a simpler approach.
 *
 * Observations:
 *
 * Parent: ROW
 *  - Panel
 *
 * If I split the panel right, this adds a child to the parent
 *
 * Parent: ROW
 *  - Panel
 *  - Panel
 *
 * They share basis percentage of the parent
 *
 * If I split the first panel right again, it should:
 *
 * Parent: ROW
 *  - Panel
 *  - Panel
 *  - Panel
 *
 * But it actually does:
 *
 * Parent: ROW
 *  - Parent: ROW
 *     - Panel
 *     - Panel
 *  - Panel
 *
 * So if I split in a way that follows the flow, it adds a sibling panel?
 *
 * Back to:
 *
 * Parent: ROW
 *  - Panel
 *  - Panel
 *
 * If I split the second bottom:
 *
 * Parent: ROW
 *  - Panel
 *  - Parent: COL
 *     - Panel
 *     - Panel
 *
 * And split the last bottom it should:
 *
 * Parent: ROW
 *  - Panel
 *  - Parent: COL
 *     - Panel
 *     - Panel
 *     - Panel
 *
 * Ok, so a parent can have any number of panel children that follow the parent's flow.
 * As soon as I split contrary to the parent's flow, it creates a new parent.
 *
 * This may at least remove the 'a' and 'b' props/logic, which is suepr messy...
 * However, having an array of child items also increases the complexity of resizing,
 * because it would need to take into account all siblings, not just work between two siblings.
 * ... However however, by only having 2 items, the resizing is annoying! With three panels
 * in a row, resizing one also affects the other, it gets quite fiddly.
 * 
 * 
 * 
 * 
 * As for the either/or type logic:
 *
 * Parent: ROW
 *  - Panel
 *  - Parent: COL
 *     - Panel
 *     - Panel
 *  - Panel
 *  - Panel
 *
 * I may have parents amongst panels, so I will still have render-this-or-that logic...
 * 
 * The 'OR' logic here is needed to know when to render a container div...
 * which is necesasry to re-flow the dlex direction
 * 
 * but a panel class itself has useless props if it would only exist for the 
 * container div needs
 * 
 * the container div still needs basis as if it were a panel
 * 
*/


class T {
  flow: 'row' | 'col';
  children: T[] = [];
}