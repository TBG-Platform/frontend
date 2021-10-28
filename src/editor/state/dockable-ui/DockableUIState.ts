import { action, observable } from 'mobx';
import { DuiUtils, PanelLayoutData } from '../../../utils/DuiUtils';
import { RandomUtils } from '../../../utils/RandomUtils';
import { DuiPanelContainer } from './DuiPanelContainer';

export class DockableUIState {
  @observable public rootContainer?: DuiPanelContainer;

  public containerMap = new Map<string, DuiPanelContainer>();
  public panelIds: string[] = [];

  constructor() {
    // const layoutData: PanelLayoutData = DuiUtils.makeOnePanelContainer();
    // this.containerMap = layoutData.containerMap;
    // this.panelIds = layoutData.panelIds;
    // this.rootContainer = this.containerMap.get(layoutData.rootContainerId);
  }

  public getContainer(id: string): DuiPanelContainer | undefined {
    return this.containerMap.get(id);
  }

  @action public setHorizontalLayout = (panelCount: number) => {
    console.log('set one panel');
    this.clearLayoutData();

    const container = new DuiPanelContainer(RandomUtils.createId());

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
