import { observable } from 'mobx';

import { DuiLayoutModel } from '../../dockable-ui/model/PanelLayoutModel';

/**
 * Local storage solution for editor properties.
 */
export class EditorRootStorage {
  @observable.ref public layouts: DuiLayoutModel[] = [];

  public loadLayouts() {
    // Read all layouts from localStorage into memory
  }

  public saveLayout(layout: DuiLayoutModel) {
    this.layouts = [...this.layouts, layout];

    // Overwrite all layouts in localStorage with those in memory
  }
}
