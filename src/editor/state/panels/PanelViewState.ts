import { action, observable } from 'mobx';
import { PanelUtils } from '../../../utils/PanelUtils';
import { Panel, PanelWidget } from './Panel';
import { PanelContainer } from './PanelContainer';
import { PanelWidgetType } from './PanelWidgetType';

export class PanelViewState {
  @observable public panelTree: PanelContainer;
  @observable.ref public focusedPanel?: Panel;

  constructor() {
    this.panelTree = PanelUtils.onePanelTest();
    this.panelTree.basis = 100;
  }

  @action public focusPanel = (panel: Panel) => {
    this.focusedPanel = panel;
    console.log('focusing on panel', panel);
  };

  @action public addPanelWidget = () => {
    // Add a panel widget to the focused panel
    let panelTarget = this.focusedPanel;
    // If no focused panel, choose first panel
    if (!panelTarget) {
      panelTarget = PanelUtils.findFirstPanel(this.panelTree);
    }
    // If still no panel target, there are no panels!
    if (!panelTarget) {
      console.log('need to make a panel first!');
      return;
    }

    // Otherwise, now add the widget to the panel
    const widget: PanelWidget = {
      type: PanelWidgetType.TEST,
      title: 'Test Widget',
    };

    panelTarget.addWidget(widget);
  };

  @action public setOnePanel = () => {
    this.panelTree = PanelUtils.onePanelTest();
    this.panelTree.basis = 100;
  };

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
