import { RandomUtils } from '../../../utils/RandomUtils';
import { DuiPanelTab } from '../dockable-ui/DuiPanel';
import { PanelTabType } from './PanelTabType';

/**
 * Holds ids of tabs within panels against tab view components, so I know what to render for a given tab
 */
export class PanelViewState {
  public tabMap = new Map<DuiPanelTab, PanelTabType>();

  public makeTab(tab: PanelTabType) {
    const id = RandomUtils.createId();
    const newTab: DuiPanelTab = {
      id,
      label: tab,
    };

    this.tabMap.set(newTab, tab);

    return newTab;
  }
}
