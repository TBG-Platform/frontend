import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Panel } from '../../state/PanelViewState';

import './panel-display.scss';

interface Props {
  panel: Panel;
}

@observer
export class PanelDisplay extends React.Component<Props> {
  public render() {
    const { panel } = this.props;

    const panelStyle: CSSProperties = {
      flexBasis: panel.basis + '%',
    };

    return (
      <div className={'panel'} style={panelStyle}>
        <div className={'panel-tab-list'}>
          {panel.tabs.map((tab, idx) => this.renderPanelTab(tab, idx))}
        </div>
        <div className={'panel-body'}></div>
      </div>
    );
  }

  private renderPanelTab(tabName: string, tabIndex: number) {
    const { panel } = this.props;

    return (
      <div key={`panel-${panel.id}-tab-${tabIndex}`} className={'panel-tab'}>
        {tabName}
      </div>
    );
  }
}
