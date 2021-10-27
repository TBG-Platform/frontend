import { action, observable } from 'mobx';
import { PanelTreeData, PanelUtils } from '../../../utils/PanelUtils';
import { RandomUtils } from '../../../utils/RandomUtils';
import { Panel, PanelWidget } from './Panel';
import { PanelContainer } from './PanelContainer';
import { PanelWidgetType } from './PanelWidgetType';

export class PanelViewState {
  @observable public panelTree?: PanelContainer;
  @observable.ref public focusedPanel?: Panel;
  private panelMap = new Map<string, Panel>();

  constructor() {}

  @action public focusPanel = (panel: Panel) => {
    this.focusedPanel = panel;
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
      id: RandomUtils.createId(),
      type: PanelWidgetType.TEST,
      title: 'Test Widget',
    };

    panelTarget.addWidget(widget);
  };

  @action public moveWidgetToPanel = (widgetId: string, fromPanelId: string, toPanel: Panel) => {
    const fromPanel = this.panelMap.get(fromPanelId);
    const widget = fromPanel.getWidget(widgetId);
    fromPanel.removeWidget(widgetId);
    toPanel.addWidget(widget);
  };

  @action public setOnePanelLayout = () => {
    const data = PanelUtils.onePanelLayout();
    this.panelTree = data.tree;
    this.panelMap = data.map;
  };

  @action public setTwoPanelLayout = () => {
    const data = PanelUtils.twoPanelLayout();
    this.panelTree = data.tree;
    this.panelMap = data.map;
  };

  @action public setThreePanelLayout = () => {
    const data = PanelUtils.threePanelLayout();
    this.panelTree = data.tree;
    this.panelMap = data.map;
  };

  @action public setFourPanelLayout = () => {
    const data = PanelUtils.fourPanelLayout();
    this.panelTree = data.tree;
    this.panelMap = data.map;
  };
}
