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
  public id = RandomUtils.createId();
  @observable public flow = DuiPanelContainerFlow.ROW;
  @observable public children: DuiPanelContainerChild[] = [];

  @action public addChild(child: DuiPanelContainerChild) {
    this.children.push(child);
  }
}
