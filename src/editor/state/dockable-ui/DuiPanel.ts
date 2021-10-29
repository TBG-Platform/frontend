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
    this.tabs = this.tabs.filter((tab) => tab.id !== id);

    // Was this the selected tab? Remove its ref
    if (this.selectedTab?.id === id) {
      this.selectedTab = undefined;
    }
  }

  @action public selectTab(tab: DuiPanelTab) {
    this.selectedTab = tab;
  }

  public isSelected(tab: DuiPanelTab) {
    return tab.id === this.selectedTab?.id;
  }
}
