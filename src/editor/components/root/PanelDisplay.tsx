import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Panel, PanelWidget } from '../../state/panels/Panel';
import { PanelWidgetType } from '../../state/panels/PanelWidgetType';

import './panel-display.scss';

interface Props {
  panel: Panel;
  onFocus: () => void;
  renderWidgetBody: (panelWidgetType: PanelWidgetType) => JSX.Element;
}

@observer
export class PanelDisplay extends React.Component<Props> {
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
        <div className={'panel-body'}>
          {panel.selectedWidget && renderWidgetBody(panel.selectedWidget.type)}
        </div>
      </div>
    );
  }

  private renderPanelWidgetTab(widget: PanelWidget) {
    const { panel } = this.props;

    return (
      <div key={`panel-${panel.id}-tab-${widget.title}`} className={'panel-tab'}>
        {widget.title}
      </div>
    );
  }
}
