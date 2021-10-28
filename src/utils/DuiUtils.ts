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
    const rc = new DuiPanelContainer();

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
}
