import { observable } from 'mobx';

import { DuiLayoutModel, LayoutModel } from '../../dockable-ui/model/PanelLayoutModel';

/**
 * Local storage solution for editor properties.
 */
export class EditorRootStorage {
  @observable.ref public layouts: LayoutModel[] = [];
  private readonly layoutsKey = 'LAYOUTS';

  constructor() {
    this.loadLayouts();
  }

  public loadLayouts() {
    // Read all layouts from localStorage into memory
    const layoutsData = localStorage.getItem(this.layoutsKey);
    if (!layoutsData) {
      return;
    }

    this.layouts = JSON.parse(layoutsData);

    console.log('loaded layouts: ', this.layouts);
  }

  public saveLayout(layout: LayoutModel) {
    this.layouts = [...this.layouts, layout];

    // Overwrite all layouts in localStorage with those in memory
    localStorage.setItem(this.layoutsKey, JSON.stringify(this.layouts));

    console.log('saved new layout', layout);
  }
}
