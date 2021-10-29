import { RandomUtils } from '../../../utils/RandomUtils';
import { DuiPanelTab } from '../dockable-ui/DuiPanel';
import { PanelTabType } from './PanelTabType';

/**
 * Holds ids of tabs within panels against tab view components, so I know what to render for a given tab
 */
export class PanelViewState {
  public tabMap = new Map<DuiPanelTab, PanelTabType>();

  public makeTab(tab: PanelTabType) {
    const id = RandomUtils.createId();
    const newTab: DuiPanelTab = {
      id,
      label: tab,
    };

    this.tabMap.set(newTab, tab);

    return newTab;
  }
}

// Keeping this for now

// import { action, observable } from 'mobx';
// import { PanelTreeData, PanelUtils } from '../../../utils/PanelUtils';
// import { RandomUtils } from '../../../utils/RandomUtils';
// import { Panel, PanelWidget } from './Panel';
// import { PanelContainer, PanelFlow } from './PanelContainer';
// import { PanelWidgetType } from './PanelWidgetType';

// export class PanelViewState {
//   @observable public panelTree?: PanelContainer;
//   @observable.ref public focusedPanel?: Panel;
//   private panelMap = new Map<string, Panel>();

//   constructor() {}

//   @action public focusPanel = (panel: Panel) => {
//     this.focusedPanel = panel;
//   };

//   @action public addPanelWidget = () => {
//     // Add a panel widget to the focused panel
//     let panelTarget = this.focusedPanel;
//     // If no focused panel, choose first panel
//     if (!panelTarget) {
//       panelTarget = PanelUtils.findFirstPanel(this.panelTree);
//     }
//     // If still no panel target, there are no panels!
//     if (!panelTarget) {
//       console.log('need to make a panel first!');
//       return;
//     }

//     // Otherwise, now add the widget to the panel
//     const widget: PanelWidget = {
//       id: RandomUtils.createId(),
//       type: PanelWidgetType.TEST,
//       title: 'Test Widget',
//     };

//     panelTarget.addWidget(widget);
//   };

//   @action public moveWidgetToPanel = (widgetId: string, fromPanelId: string, toPanel: Panel) => {
//     const fromPanel = this.panelMap.get(fromPanelId);
//     const widget = fromPanel.getWidget(widgetId);
//     fromPanel.removeWidget(widgetId);
//     toPanel.addWidget(widget);
//   };

//   @action public splitPanel = (panel: Panel, flow: PanelFlow) => {
//     console.log('splitting panel');
//     /**
//      * If this panel is a, and there's no b, add a b panel
//      * otherwise, this panel becomes a container
//      */
//     const parent = panel.parent;
//     if (parent.hasPanelB()) {
//       // This panel needs to become a panel container
//       const pc = new PanelContainer();
//       pc.flow = flow;

//       // Container 'a' becomes this panel
//       pc.a = panel;

//       // Update its basis
//       pc.a.basis = 50;

//       // New panel 'b' in container
//       const newPanel = new Panel(pc);
//       pc.b = newPanel;

//       // Update panel map
//       this.panelMap.set(newPanel.id, newPanel);

//       // Set the new container
//       panel.parent.makePanelIntoContainer(panel, pc);
//     } else {
//       const bPanel = new Panel(parent);
//       // Fill the b slot with a new panel instead
//       parent.b = bPanel;
//       parent.flow = flow;

//       // Update first panel's basis
//       parent.a.basis = 50;

//       this.panelMap.set(bPanel.id, bPanel);
//     }
//   };

//   @action public setOnePanelLayout = () => {
//     const data = PanelUtils.onePanelLayout();
//     this.panelTree = data.tree;
//     this.panelMap = data.map;
//   };

//   @action public setTwoPanelLayout = () => {
//     const data = PanelUtils.twoPanelLayout();
//     this.panelTree = data.tree;
//     this.panelMap = data.map;
//   };

//   @action public setThreePanelLayout = () => {
//     const data = PanelUtils.threePanelLayout();
//     this.panelTree = data.tree;
//     this.panelMap = data.map;
//   };

//   @action public setFourPanelLayout = () => {
//     const data = PanelUtils.fourPanelLayout();
//     this.panelTree = data.tree;
//     this.panelMap = data.map;
//   };
// }
