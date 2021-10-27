import { observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';

export class PanelV2 {
  public id = RandomUtils.createId();
  /**
   * Either a new map of parents to get by id, or refs
   * both need updating as parent changes, this is easier
   */
  public parent: PanelContainerV2;
  @observable public basis = 100;
  // widgets stuff

  constructor(parent: PanelContainerV2) {
    this.parent = parent;
  }
}

export enum PanelContainerFlow {
  ROW = 'row',
  COLUMN = 'column',
}

export type PanelItem = PanelV2 | PanelContainerV2;

export class PanelContainerV2 {
  public id = RandomUtils.createId();
  public flow = PanelContainerFlow.ROW;
  @observable public children: PanelItem[] = [];
  @observable public basis = 100;
}

/**
 * When splitting a panel:
 *  - check if split direction conforms to parent
 *   - if so, push to parent's children
 *   - if not, that panel becomes a parent of contrary flow
 */

/**
 * When creating a panel:
 *  - it is added to children of a container
 *  - all children get re-based evenly
 */

/**
 * When creating a container:
 *  - it is added to children of container
 *  - all children get rebased evenly
 */

/**
 * When resizing a panel:
 *  - the bar only ever sits between two items
 *  - those two are what is resized via:
 *  - total panel width - non-neighbouring items = space to resize
 *  - resize bar percent of space to resize, assign to either side
 *  - if the percent is greater than 100, it start eating into other items space
 *    - but how to determine which items?
 *    - is it if an item is already at min size, it goes to next neighbour in that direction?
 */
