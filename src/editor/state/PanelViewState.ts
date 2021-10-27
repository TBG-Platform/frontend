import { action, observable } from 'mobx';
import { PanelUtils } from '../../utils/PanelUtils';
import { RandomUtils } from '../../utils/RandomUtils';

export enum PanelWidgetType {
  PAGE_DISPLAY = 'page-display',
}

export class PanelWidget {
  type: PanelWidgetType;
  title: string;
}

export class Panel {
  id = RandomUtils.createId();
  tabs: string[] = []; // docked tabs with a panel
  widgets: PanelWidget[] = [];
  @observable basis: number = 50;
}

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

export class PanelViewState {
  @observable public panelTree: PanelContainer;

  constructor() {
    this.setTwoPanelLR();
  }

  @action public setTwoPanelLR = () => {
    this.panelTree = PanelUtils.twoPanelTestLR();
    this.panelTree.basis = 100;
  };

  @action public setTwoPanelTB = () => {
    this.panelTree = PanelUtils.twoPanelTestTB();
    this.panelTree.basis = 100;
  };

  @action public setLRTB = () => {
    this.panelTree = PanelUtils.nestedLRTBTet();
    this.panelTree.basis = 100;
  };

  @action public setLTBRTB = () => {
    this.panelTree = PanelUtils.nestedLTBRTB();
    this.panelTree.basis = 100;
  };
}
