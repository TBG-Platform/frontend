import { action, observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';
import { PanelContainer } from './PanelContainer';
import { PanelWidgetType } from './PanelWidgetType';

export interface PanelWidget {
  id: string;
  type: PanelWidgetType;
  title: string;
}

export class Panel {
  public id = RandomUtils.createId();
  public parent: PanelContainer;
  @observable public basis: number = 50;
  @observable public widgets: PanelWidget[] = [];
  @observable.ref public selectedWidget?: PanelWidget;

  constructor(parent: PanelContainer) {
    this.parent = parent;
  }

  public getWidget(id: string) {
    return this.widgets.find((widget) => widget.id === id);
  }

  @action public selectWidget = (widget: PanelWidget) => {
    this.selectedWidget = widget;
  };

  @action public addWidget(widget: PanelWidget) {
    this.widgets.push(widget);
    this.selectWidget(widget);
  }

  @action public removeWidget(widgetId: string) {
    this.widgets = this.widgets.filter((widget) => widget.id !== widgetId);

    // Was this the selected widget?
    if (this.selectedWidget?.id === widgetId) {
      this.selectedWidget = undefined;
    }
  }
}
