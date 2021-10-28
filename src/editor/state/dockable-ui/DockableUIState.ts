import { observable } from 'mobx';
import { DuiUtils, PanelLayoutData } from '../../../utils/DuiUtils';
import { DuiPanelContainer } from './DuiPanelContainer';

export class DockableUIState {
  @observable public rootContainer?: DuiPanelContainer;

  public containerMap = new Map<string, DuiPanelContainer>();
  public panelIds: string[] = [];

  constructor() {
    const layoutData: PanelLayoutData = DuiUtils.makeOnePanelContainer();
    this.containerMap = layoutData.containerMap;
    this.panelIds = layoutData.panelIds;
    this.rootContainer = this.containerMap.get(layoutData.rootContainerId);
  }

  public getContainer(id: string): DuiPanelContainer | undefined {
    return this.containerMap.get(id);
  }
}
