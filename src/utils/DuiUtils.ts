import {
  DuiPanelContainer,
  DuiPanelContainerChild,
} from '../editor/state/dockable-ui/DuiPanelContainer';
import { RandomUtils } from './RandomUtils';

export interface PanelLayoutData {
  rootContainerId: string;
  containerMap: Map<string, DuiPanelContainer>;
  panelIds: string[];
}

export class DuiUtils {
  public static makeContainerChildren(count: number): DuiPanelContainerChild[] {
    const children: DuiPanelContainerChild[] = [];

    for (let i = 0; i < count; i++) {
      children.push({
        id: RandomUtils.createId(),
        basis: 100 / count,
      });
    }

    return children;
  }
}
