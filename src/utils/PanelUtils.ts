import { Panel } from '../editor/state/panels/Panel';
import { PanelContainer, PanelFlow } from '../editor/state/panels/PanelContainer';

export interface PanelTreeData {
  tree: PanelContainer;
  map: Map<string, Panel>;
}

export class PanelUtils {
  public static isPanelContainer(item: Panel | PanelContainer): item is PanelContainer {
    return item instanceof PanelContainer;
  }

  public static isPanel(item: Panel | PanelContainer): item is Panel {
    return item instanceof Panel;
  }

  public static findFirstPanel(panelCont: PanelContainer): Panel | undefined {
    // If there is no a and b, return undefined
    if (!panelCont.a && !panelCont.b) {
      return undefined;
    }

    // Return a then b if either are panels
    if (PanelUtils.isPanel(panelCont.a)) {
      return panelCont.a;
    }

    if (PanelUtils.isPanel(panelCont.b)) {
      return panelCont.b;
    }

    // If a is a panel container, call again with that
    let panel: Panel | undefined = undefined;
    if (PanelUtils.isPanelContainer(panelCont.a)) {
      panel = PanelUtils.findFirstPanel(panelCont.a);
    }

    // If still no panel, try with b
    if (!panel && PanelUtils.isPanelContainer(panelCont.b)) {
      panel = PanelUtils.findFirstPanel(panelCont.b);
    }

    return panel;
  }

  public static twoPanelTest(): PanelTreeData {
    const tree = new PanelContainer();
    const map = new Map<string, Panel>();

    const p = new Panel();

    tree.a = p;
    map.set(p.id, p);

    const p2 = new Panel();

    tree.b = p2;
    map.set(p2.id, p2);

    return {
      tree,
      map,
    };
  }

  // Passes
  // One panel only
  public static onePanelTest() {
    const rootContainer = new PanelContainer();

    const panel = new Panel();
    rootContainer.a = panel;

    return rootContainer;
  }

  // Passes
  // Two panels side by side
  public static twoPanelTestLR() {
    const container = this.onePanelTest();

    const panel2 = new Panel();
    //panel2.tabs = ['Another_Tab', 'Wowzer'];

    container.b = panel2;

    return container;
  }

  // Passes
  // Two panels, one above other
  public static twoPanelTestTB() {
    const container = this.onePanelTest();

    const p2 = new Panel();
    // p2.tabs = ['ImBelow', 'Cool'];

    container.b = p2;
    container.flow = PanelFlow.COLUMN;

    return container;
  }

  // Passes
  // One panel to left, two split top-bot on right
  public static nestedLRTBTet() {
    // Get a container with one panel on 'a'
    const container = this.onePanelTest();

    // Make a new container for b, column flow
    const nestCont = new PanelContainer();
    nestCont.flow = PanelFlow.COLUMN;

    // Create two panels for new container
    const p1 = new Panel();
    //p1.tabs = ['Top'];
    nestCont.a = p1;
    const p2 = new Panel();
    //p2.tabs = ['Bot'];
    nestCont.b = p2;

    // Assign new container to container 'b'
    container.b = nestCont;

    return container;
  }

  public static nestedLTBRTB() {
    const lrCont = this.twoPanelTestLR();

    const tb1 = this.twoPanelTestTB();
    const tb2 = this.twoPanelTestTB();

    lrCont.a = tb1;
    lrCont.b = tb2;

    return lrCont;
  }
}
