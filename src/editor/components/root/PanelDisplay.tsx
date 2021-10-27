import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Panel, PanelWidget } from '../../state/panels/Panel';
import { PanelWidgetType } from '../../state/panels/PanelWidgetType';

import './panel-display.scss';

interface Props {
  panel: Panel;
  onFocus: () => void;
  renderWidgetBody: (panelWidgetType: PanelWidgetType) => JSX.Element;
  //onWidgetDrop: () => void;
}

@observer
export class PanelDisplay extends React.Component<Props> {
  private panelBodyRef = React.createRef<HTMLDivElement>();

  public render() {
    const { panel, onFocus, renderWidgetBody } = this.props;

    console.log('rendering panel: ', panel);

    const panelStyle: CSSProperties = {
      flexBasis: panel.basis + '%',
    };

    return (
      <div className={'panel'} style={panelStyle} onClick={onFocus}>
        <div className={'panel-tab-list'}>
          {panel.widgets.map((widget) => this.renderPanelWidgetTab(widget))}
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
    console.log('dragging tab');

    // Set the transfer data to hold widget id and 'from' panel

    const target = e.target as HTMLDivElement;
    e.dataTransfer.setData('text', target.id);
  };

  private onDragTabEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('stopped dragging tab');

    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.remove('hover-backdrop-full');
    }
  };

  private onDragOverPanel = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('drag over panel');

    // Show the hover guide backdrop
    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.add('hover-backdrop-full');
    }

    return false;
  };

  private onDragOverLeavePanel = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('drag leave panel');

    if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
      return;
    }

    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.remove('hover-backdrop-full');
    }
  };

  private onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('on drop');

    if (this.panelBodyRef.current) {
      this.panelBodyRef.current.classList.remove('hover-backdrop-full');
    }

    // How to get widget id?
    const id = e.dataTransfer.getData('text');
    console.log('id: ', id);

    e.dataTransfer.clearData();
  };
}
