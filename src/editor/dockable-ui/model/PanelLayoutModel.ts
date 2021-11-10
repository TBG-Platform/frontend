import { DuiPanelContainerChild, DuiPanelContainerFlow } from '../state/DuiPanelContainer';

export interface DuiLayoutModel {
  rootContainerId: string;
  containers: DuiPanelContainerModel[];
  panels: DuiPanelModel[];
}

export interface DuiPanelContainerModel {
  id: string;
  parentId: string;
  flow: DuiPanelContainerFlow;
  children: DuiPanelContainerChild[];
}

export interface DuiPanelModel {
  id: string;
}
