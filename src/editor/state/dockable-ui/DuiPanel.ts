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

  @action public addTab(tab: DuiPanelTab) {
    this.tabs.push(tab);
    console.log('added tab', this.tabs);
  }
}
