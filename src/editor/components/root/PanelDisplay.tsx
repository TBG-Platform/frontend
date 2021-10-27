import { Button, Icon } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Panel, PanelWidget } from '../../state/panels/Panel';
import { PanelWidgetType } from '../../state/panels/PanelWidgetType';

import './panel-display.scss';

interface WidgetDragData {
  widgetId: string;
  fromPanelId: string;
}

interface Props {
  panel: Panel;
  onFocus: () => void;
  renderWidgetBody: (panelWidgetType: PanelWidgetType) => JSX.Element;
  onWidgetDrop: (widgetId: string, fromPanelId: string, toPanel: Panel) => void;
}

@observer
export class PanelDisplay extends React.Component<Props> {
  private panelBodyRef = React.createRef<HTMLDivElement>();

  public render() {
    const { panel, onFocus, renderWidgetBody } = this.props;

    const panelStyle: CSSProperties = {
      flexBasis: panel.basis + '%',
    };

    return (
      <div className={'panel'} style={panelStyle} onClick={onFocus}>
        <div className={'panel-navbar'}>
          <div className={'panel-tab-list'}>
            {panel.widgets.map((widget) => this.renderPanelWidgetTab(widget))}
          </div>
          <div className={'panel-options'}>
            <Popover2>
              <Button icon={'more'} small minimal />
            </Popover2>
          </div>
        </div>
        <div
          ref={this.panelBodyRef}
          className={'panel-body'}
          onDragOver={this.onDragOverPanel}
          onDragLeave={this.onDragOverLeavePanel}
          onDrop={this.onDrop}
        >
          {panel.selectedWidget && renderWidgetBody(panel.selectedWidget.type)}
        </div>
      </div>
    );
  }

  private renderPanelWidgetTab(widget: PanelWidget) {
    const { panel } = this.props;

    return (
      <div
        key={`panel-${panel.id}-tab-${widget.title}`}
        id={widget.id}
        className={'panel-tab'}
        draggable={'true'}
        onDragStart={this.onDragTabStart}
        onDragEnd={this.onDragTabEnd}
      >
        {widget.title}
      </div>
    );
  }

  private onDragTabStart = (e: React.DragEvent<HTMLDivElement>) => {
    const { panel } = this.props;

    const target = e.target as HTMLDivElement;

    // Set the transfer data to hold widget id and 'from' panel
    const data: WidgetDragData = {
      widgetId: target.id,
      fromPanelId: panel.id,
    };

    e.dataTransfer.setData('text', JSON.stringify(data));
  };

  private onDragTabEnd = (_e: React.DragEvent<HTMLDivElement>) => {
    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.remove('hover-backdrop-full');
    }
  };

  private onDragOverPanel = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Show the hover guide backdrop
    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.add('hover-backdrop-full');
    }

    return false;
  };

  private onDragOverLeavePanel = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Due to tabs for this panel being nested, causes flicker otherwise
    if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
      return;
    }

    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.remove('hover-backdrop-full');
    }
  };

  private onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { panel, onWidgetDrop } = this.props;

    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.remove('hover-backdrop-full');
    }

    // How to get widget id?
    const data: WidgetDragData = JSON.parse(e.dataTransfer.getData('text'));

    onWidgetDrop(data.widgetId, data.fromPanelId, panel);

    e.dataTransfer.clearData();
  };
}
