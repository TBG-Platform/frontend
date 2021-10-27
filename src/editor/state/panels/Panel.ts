import { observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';

export enum PanelWidgetType {
  PAGE_DISPLAY = 'page-display',
}

export class PanelWidget {
  type: PanelWidgetType;
  title: string;
}

export class Panel {
  id = RandomUtils.createId();
  tabs: string[] = []; // docked tabs with a panel
  widgets: PanelWidget[] = [];
  @observable basis: number = 50;
}
