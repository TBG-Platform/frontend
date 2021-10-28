import {
  DuiPanelContainer,
  DuiPanelContainerChild,
  DuiPanelContainerFlow,
} from '../editor/state/dockable-ui/DuiPanelContainer';
import { RandomUtils } from './RandomUtils';

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
