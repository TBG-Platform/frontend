import { action, observable } from 'mobx';
import { RandomUtils } from '../../../utils/RandomUtils';
import { PanelWidgetType } from './PanelWidgetType';

export interface PanelWidget {
  id: string;
  type: PanelWidgetType;
  title: string;
  // body: JSX.Element;
}

export class Panel {
  id = RandomUtils.createId();
  @observable basis: number = 50;
  @observable widgets: PanelWidget[] = [];
  @observable.ref selectedWidget?: PanelWidget;

  public getWidget(id: string) {
    return this.widgets.find((widget) => widget.id === id);
  }

  @action public selectWidget = (widget: PanelWidget) => {
    this.selectedWidget = widget;
  };

  @action public addWidget(widget: PanelWidget) {
    this.widgets.push(widget);
    this.selectWidget(widget);

    console.log('added widget', widget);
  }

  @action public removeWidget(widgetId: string) {
    this.widgets = this.widgets.filter((widget) => widget.id !== widgetId);
  }
}
