import { Tree } from '@blueprintjs/core';
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

  public static onePanelLayout(): PanelTreeData {
    const tree = new PanelContainer();
    const map = new Map<string, Panel>();

    const p = new Panel(tree);

    tree.a = p;
    map.set(p.id, p);

    tree.basis = 100;
    tree.a.basis = 100;

    return {
      tree,
      map,
    };
  }

  public static twoPanelLayout(): PanelTreeData {
    const tree = new PanelContainer();
    const map = new Map<string, Panel>();

    const p = new Panel(tree);

    tree.a = p;
    map.set(p.id, p);

    const p2 = new Panel(tree);

    tree.b = p2;
    map.set(p2.id, p2);

    tree.basis = 100;

    return {
      tree,
      map,
    };
  }

  public static threePanelLayout(): PanelTreeData {
    const data = PanelUtils.onePanelLayout();

    const pc = new PanelContainer();
    pc.flow = PanelFlow.COLUMN;

    const p1 = new Panel(pc);
    const p2 = new Panel(pc);

    pc.a = p1;
    pc.b = p2;

    data.tree.b = pc;

    data.map.set(p1.id, p1);
    data.map.set(p2.id, p2);

    data.tree.basis = 100;
    data.tree.a.basis = 50;

    return data;
  }

  public static fourPanelLayout() {
    const tree = new PanelContainer();

    const pc1 = new PanelContainer();
    pc1.flow = PanelFlow.COLUMN;

    const p1 = new Panel(pc1);
    const p2 = new Panel(pc1);
    pc1.a = p1;
    pc1.b = p2;

    tree.a = pc1;

    const pc2 = new PanelContainer();
    pc2.flow = PanelFlow.COLUMN;

    const p3 = new Panel(pc2);
    const p4 = new Panel(pc2);
    pc2.a = p3;
    pc2.b = p4;

    tree.b = pc2;

    const map = new Map<string, Panel>();
    map.set(p1.id, p1);
    map.set(p2.id, p2);
    map.set(p3.id, p3);
    map.set(p4.id, p4);

    tree.basis = 100;

    return {
      tree,
      map,
    };
  }
}
