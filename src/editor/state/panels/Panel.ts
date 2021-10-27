import { observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';
import { PanelWidgetType } from './PanelWidgetType';

export class PanelWidget {
  type: PanelWidgetType;
  title: string;
  body: JSX.Element;
}

export class Panel {
  id = RandomUtils.createId();
  tabs: string[] = []; // docked tabs with a panel
  widgets: PanelWidget[] = [];
  @observable basis: number = 50;
}
