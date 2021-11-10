import { DuiPanelContainerChild, DuiPanelContainerFlow } from '../state/DuiPanelContainer';
import { DuiPanelTab } from '../state/DuiPanel';
import { PanelTab } from '../../editor-root/state/EditorRootState';

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
  tabs: DuiPanelTab[];
}

export interface LayoutModel extends DuiLayoutModel {
  name: string;
  panels: PanelModel[];
}

export interface PanelModel {
  id: string;
  tabs: PanelTab[];
}
