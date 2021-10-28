import React, { CSSProperties } from 'react';
import { Panel } from '../../state/panels/Panel';
import { PanelContainer, PanelFlow } from '../../state/panels/PanelContainer';
import { PanelDisplay } from './PanelDisplay';
import { PanelResizer } from './PanelResizer';
import { observer } from 'mobx-react';
import { PanelUtils } from '../../../utils/PanelUtils';
import { PanelWidgetType } from '../../state/panels/PanelWidgetType';

import './panel-container-display.scss';

interface Props {
  panelContainer: PanelContainer;
  onFocusPanel: (panel: Panel) => void;
  renderWidgetBody: (panelWidgetType: PanelWidgetType) => JSX.Element;
  onWidgetDrop: (widgetId: string, fromPanelId: string, toPanel: Panel) => void;
  onPanelSplit: (panel: Panel, flow: PanelFlow) => void;
}

@observer
export class PanelContainerDisplay extends React.Component<Props> {
  private panelContRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.panelContRef.current) {
      this.props.panelContainer.setDiv(this.panelContRef.current);
    }
  }

  public render() {
    const { panelContainer } = this.props;

    const content: JSX.Element[] = [];

    if (panelContainer.a) {
      content.push(this.getPanelOrContainer(panelContainer.a));
    }

    if (panelContainer.b) {
      content.push(this.getPanelOrContainer(panelContainer.b));
    }

    // If the container has a and b, add a resize bar between them
    if (panelContainer.a && panelContainer.b) {
      const resizer = (
        <PanelResizer key={`pc-${panelContainer.id}-resizer`} panelContainer={panelContainer} />
      );

      content.splice(1, 0, resizer);
    }

    const panelContainerStyle: CSSProperties = {
      flexDirection: panelContainer.flow,
      flexBasis: panelContainer.basis + '%',
    };

    return (
      <div ref={this.panelContRef} className={'panel-container'} style={panelContainerStyle}>
        {content}
      </div>
    );
  }

  private getPanelOrContainer(item: Panel | PanelContainer) {
    const { onFocusPanel, renderWidgetBody, onWidgetDrop, onPanelSplit } = this.props;

    if (PanelUtils.isPanel(item)) {
      return (
        <PanelDisplay
          key={'panel-' + item.id}
          panel={item}
          onFocus={() => onFocusPanel(item)}
          renderWidgetBody={renderWidgetBody}
          onWidgetDrop={onWidgetDrop}
          onPanelSplit={(flow: PanelFlow) => onPanelSplit(item, flow)}
        />
      );
    } else if (PanelUtils.isPanelContainer(item)) {
      return (
        <PanelContainerDisplay
          key={'pc-' + item.id}
          panelContainer={item}
          onFocusPanel={onFocusPanel}
          renderWidgetBody={renderWidgetBody}
          onWidgetDrop={onWidgetDrop}
          onPanelSplit={onPanelSplit}
        />
      );
    } else {
      return undefined;
    }
  }
}