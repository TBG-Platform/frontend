import { observable } from 'mobx';

import { LayoutModel } from '../../dockable-ui/model/PanelLayoutModel';

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
  }

  public saveLayout(layout: LayoutModel) {
    this.layouts = [...this.layouts, layout];

    // Overwrite all layouts in localStorage with those in memory
    localStorage.setItem(this.layoutsKey, JSON.stringify(this.layouts));
  }
}
