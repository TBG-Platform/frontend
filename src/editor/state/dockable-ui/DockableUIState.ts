import { action, observable } from 'mobx';
import { DuiUtils, PanelLayoutData } from '../../../utils/DuiUtils';
import { RandomUtils } from '../../../utils/RandomUtils';
import { DuiPanelContainer, DuiPanelContainerFlow } from './DuiPanelContainer';

export class DockableUIState {
  @observable public rootContainer?: DuiPanelContainer;

  public containerMap = new Map<string, DuiPanelContainer>();
  public panelIds: string[] = [];

  constructor() {}

  public getContainer(id: string): DuiPanelContainer | undefined {
    return this.containerMap.get(id);
  }

  @action public setFlatLayout = (panelCount: number, flow?: DuiPanelContainerFlow) => {
    this.clearLayoutData();

    const container = new DuiPanelContainer(RandomUtils.createId());
    if (flow) {
      container.flow = flow;
    }

    const children = DuiUtils.makeContainerChildren(panelCount);
    this.panelIds = children.map((ch) => ch.id);

    container.children = children;

    this.rootContainer = container;
    this.containerMap.set(this.rootContainer.id, this.rootContainer);
  };

  @action public setNestedLayout = () => {
    this.clearLayoutData();

    const container = new DuiPanelContainer(RandomUtils.createId());

    // Get 2 children, apply to container
    const children = DuiUtils.makeContainerChildren(2);
    container.children = children;

    // First is a panel
    this.panelIds.push(children[0].id);

    // Second is a container
    const innerCont = new DuiPanelContainer(children[1].id);
    innerCont.flow = DuiPanelContainerFlow.COLUMN;

    // Give it 2 children
    const innerChildren = DuiUtils.makeContainerChildren(2);
    innerCont.children = innerChildren;

    // Both are panels
    this.panelIds = [...this.panelIds, ...innerChildren.map((ch) => ch.id)];

    this.containerMap.set(container.id, container);
    this.containerMap.set(innerCont.id, innerCont);

    this.rootContainer = container;
  };

  @action private clearLayoutData() {
    this.rootContainer = undefined;
    this.containerMap.clear();
    this.panelIds = [];
  }
}
