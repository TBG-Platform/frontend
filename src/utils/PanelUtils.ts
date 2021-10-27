import { Panel, PanelContainer, PanelFlow } from '../editor/state/PanelViewState';

export class PanelUtils {
  public static isPanelContainer(item: Panel | PanelContainer): item is PanelContainer {
    return item instanceof PanelContainer;
  }

  public static isPanel(item: Panel | PanelContainer): item is Panel {
    return item instanceof Panel;
  }

  // Passes
  // One panel only
  public static onePanelTest() {
    const rootContainer = new PanelContainer();

    const panel = new Panel();
    panel.tabs = ['First_Tab', 'SecondTab', 'Third'];
    rootContainer.a = panel;

    return rootContainer;
  }

  // Passes
  // Two panels side by side
  public static twoPanelTestLR() {
    const container = this.onePanelTest();

    const panel2 = new Panel();
    panel2.tabs = ['Another_Tab', 'Wowzer'];

    container.b = panel2;

    return container;
  }

  // Passes
  // Two panels, one above other
  public static twoPanelTestTB() {
    const container = this.onePanelTest();

    const p2 = new Panel();
    p2.tabs = ['ImBelow', 'Cool'];

    container.b = p2;
    container.flow = PanelFlow.COLUMN;

    return container;
  }

  // One panel to left, two split top-bot on right
  public static nestedLRTBTet() {
    // Get a container with one panel on 'a'
    const container = this.onePanelTest();

    // Make a new container for b, column flow
    const nestCont = new PanelContainer();
    nestCont.flow = PanelFlow.COLUMN;

    // Create two panels for new container
    const p1 = new Panel();
    p1.tabs = ['Top'];
    nestCont.a = p1;
    const p2 = new Panel();
    p2.tabs = ['Bot'];
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
