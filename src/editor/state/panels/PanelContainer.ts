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
