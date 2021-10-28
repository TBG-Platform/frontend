import { action, observable } from 'mobx';
import { DuiUtils } from '../../../utils/DuiUtils';
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

  @action public splitPanel = (
    containerId: string,
    panelId: string,
    flow: DuiPanelContainerFlow
  ) => {
    const container = this.containerMap.get(containerId);
    if (!container) {
      return;
    }

    // If the split follows the container's flow, new sibling panel
    if (container.flow === flow) {
      // Make a new sibling panel
      const siblingId = RandomUtils.createId();
      container.addChild(siblingId, panelId);
    }

    // If the split is contrary to container's flow, new container with this panel and new one
  };

  @action public deletePanel = (containerId: string, panelId: string) => {
    const cont = this.containerMap.get(containerId);
    cont.removeChild(panelId);

    // If this was the last panel of that container, delete the container
    if (!cont.children.length) {
      this.deleteContainer(cont);
    }
  };

  @action public setFlatLayout = (panelCount: number, flow?: DuiPanelContainerFlow) => {
    this.clearLayoutData();

    const container = new DuiPanelContainer(RandomUtils.createId(), '');
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

    const container = new DuiPanelContainer(RandomUtils.createId(), '');

    // Get 2 children, apply to container
    const children = DuiUtils.makeContainerChildren(2);
    container.children = children;

    // First is a panel
    this.panelIds.push(children[0].id);

    // Second is a container
    const innerCont = new DuiPanelContainer(children[1].id, container.id);
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

  @action private deleteContainer(container: DuiPanelContainer) {
    this.containerMap.delete(container.id);

    // Was this the root container?
    if (container.id === this.rootContainer.id) {
      this.rootContainer = undefined;
      return; // nothing else to do
    }

    // Otherwise, parent needs to remove this container
    const parent = this.containerMap.get(container.parentId);
    parent.removeChild(container.id);

    // If the parent is also now empty, delete that; recurse
    if (!parent.children.length) {
      this.deleteContainer(parent);
    }
  }

  @action private clearLayoutData() {
    this.rootContainer = undefined;
    this.containerMap.clear();
    this.panelIds = [];
  }
}
