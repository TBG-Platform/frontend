import { action, observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';
import { Panel } from './Panel';

export enum PanelFlow {
  ROW = 'row',
  COLUMN = 'column',
}

export class PanelContainer {
  id = RandomUtils.createId();
  div?: HTMLDivElement;
  @observable a?: Panel | PanelContainer;
  @observable b?: Panel | PanelContainer;
  flow = PanelFlow.ROW;
  @observable basis: number = 50;

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
}
