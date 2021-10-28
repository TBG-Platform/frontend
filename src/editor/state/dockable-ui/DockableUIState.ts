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

  @action public setHorizontalLayout = (panelCount: number, flow?: DuiPanelContainerFlow) => {
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

  @action private clearLayoutData() {
    this.rootContainer = undefined;
    this.containerMap.clear();
    this.panelIds = [];
  }
}
