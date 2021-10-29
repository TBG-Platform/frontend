import { action, observable } from 'mobx';

export interface DuiPanelTab {
  id: string;
  label: string;
}

export class DuiPanel {
  public id: string;
  @observable public tabs: DuiPanelTab[] = [];

  constructor(id: string) {
    this.id = id;
  }

  public getTab(id: string) {
    return this.tabs.find((tab) => tab.id === id);
  }

  @action public addTab(tab: DuiPanelTab) {
    this.tabs.push(tab);
  }

  @action public removeTab(id: string) {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
  }
}
