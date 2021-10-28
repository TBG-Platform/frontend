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

  constructor(id: string, parentId: string) {
    this.id = id;
    this.parentId = parentId;
  }

  @action public addChild(childId: string) {
    this.children.push({
      id: childId,
      basis: 100,
    });

    this.rebaseChildren();
  }

  @action public removeChild(id: string) {
    this.children = this.children.filter((ch) => ch.id !== id);

    this.rebaseChildren();
  }

  @action public rebaseChildren() {
    this.children.forEach((ch) => (ch.basis = 100 / this.children.length));
  }
}
