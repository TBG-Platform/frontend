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
  @observable public flow = DuiPanelContainerFlow.ROW;
  @observable public children: DuiPanelContainerChild[] = [];

  constructor(id: string) {
    this.id = id;
  }

  @action public addChild(child: DuiPanelContainerChild) {
    this.children.push(child);
  }
}
