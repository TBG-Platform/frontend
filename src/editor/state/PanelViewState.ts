import { observable } from 'mobx';

export class Panel {
  tabs: string[] = []; // docked tabs with a panel
}

export enum PanelFlow {
  ROW = 'row',
  COLUMN = 'column',
}

export class PanelContainer {
  a?: Panel | PanelContainer;
  b?: Panel | PanelContainer;
  flow = PanelFlow.ROW;

  public static isPanelContainer(item: Panel | PanelContainer): item is PanelContainer {
    return item instanceof PanelContainer;
  }

  public static isPanel(item: Panel | PanelContainer): item is Panel {
    return item instanceof Panel;
  }
}

export class PanelViewState {
  @observable public panelTree: PanelContainer;

  constructor() {
    this.panelTree = this.twoPanelTestLR();
  }

  private onePanelTest() {
    const rootContainer = new PanelContainer();
    const panel = new Panel();
    panel.tabs = ['First_Tab', 'SecondTab', 'Third'];
    rootContainer.a = panel;

    return rootContainer;
  }

  private twoPanelTestLR() {
    const container = this.onePanelTest();

    const panel2 = new Panel();
    panel2.tabs = ['Another_Tab', 'Wowzer'];

    container.b = panel2;

    return container;
  }
}

/**
 * This class holds the info that determines the panel layout of the editor.
 *
 * Users can move existing panels
 * Users can add new panels
 *
 * An existing panel, or the background, can be split in four directions by
 * dragging a panel and hovering over another (or bg):
 *
 * Hover top - splits top - bottom (hover item top)
 * Hover bot - splits bot - top (hover item bot)
 * etc
 *
 * How are the panels rendered and styled?
 * - flexbox to layout panels, using percentage basis values?
 * - grid?
 * - inline css per panel?
 *
 * What kind of data model do I need to represent this?
 * - a tree?
 *
 */
