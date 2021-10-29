import { action, observable } from 'mobx';

export interface DuiPanelTab {
  id: string;
  label: string;
}

export class DuiPanel {
  public id: string;
  @observable public tabs: DuiPanelTab[] = [];
  @observable.ref public selectedTab?: DuiPanelTab;

  constructor(id: string) {
    this.id = id;
  }

  public getTab(id: string) {
    return this.tabs.find((tab) => tab.id === id);
  }

  @action public addTab(tab: DuiPanelTab) {
    this.tabs.push(tab);

    this.selectTab(tab);
  }

  @action public removeTab(id: string) {
    let nextTab: DuiPanelTab = undefined;

    // Is this the selected tab?
    if (this.selectedTab?.id === id) {
      // Need to select the previous tab - get index
      const idx = this.tabs.findIndex((tab) => tab.id === id);

      // Find tab before or after to select
      if (idx > 0) {
        nextTab = this.tabs[idx - 1];
      } else if (this.tabs.length > 1) {
        nextTab = this.tabs[idx + 1];
      }
    }

    // Remove the tab
    this.tabs = this.tabs.filter((tab) => tab.id !== id);

    // Select the next, if any
    this.selectTab(nextTab);
    console.log('reselected after delete, ', this.selectedTab.id);
  }

  @action public selectTab(tab: DuiPanelTab) {
    this.selectedTab = tab;
  }

  public isSelected(tab: DuiPanelTab) {
    return tab.id === this.selectedTab?.id;
  }
}
