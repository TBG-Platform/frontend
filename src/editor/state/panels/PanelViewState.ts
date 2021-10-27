import { action, observable } from 'mobx';
import { PanelUtils } from '../../../utils/PanelUtils';
import { PanelContainer } from './PanelContainer';

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
