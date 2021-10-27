import { action, observable } from 'mobx';
import { PanelUtils } from '../../../utils/PanelUtils';
import { Panel } from './Panel';
import { PanelContainer } from './PanelContainer';

export class PanelViewState {
  @observable public panelTree: PanelContainer;
  @observable.ref public focusedPanel?: Panel;

  constructor() {
    this.setTwoPanelLR();
  }

  @action public focusPanel = (panel: Panel) => {
    this.focusedPanel = panel;
    console.log('focusing on panel', panel);
  };

  @action public addPanelWidget() {
    // Where am I adding it?
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
