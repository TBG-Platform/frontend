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
  public static makeOnePanelContainer(): PanelLayoutData {
    const rc = new DuiPanelContainer(RandomUtils.createId());

    const child: DuiPanelContainerChild = {
      id: 'panel-1',
      basis: 100,
    };

    rc.addChild(child);

    const containerMap = new Map<string, DuiPanelContainer>();
    containerMap.set(rc.id, rc);

    const panelIds = [child.id];

    return {
      rootContainerId: rc.id,
      containerMap,
      panelIds,
    };
  }

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
