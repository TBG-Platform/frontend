import { observer } from 'mobx-react';
import React from 'react';
import { Panel } from '../../state/PanelViewState';

import './panel-display.scss';

interface Props {
  panel: Panel;
}

@observer
export class PanelDisplay extends React.Component<Props> {
  public render() {
    const { panel } = this.props;

    return (
      <div className={'panel'}>
        <div className={'panel-tab-list'}>{panel.tabs.map((tab) => this.renderPanelTab(tab))}</div>
        <div className={'panel-body'}></div>
      </div>
    );
  }

  private renderPanelTab(name: string) {
    return <div className={'panel-tab'}>{name}</div>;
  }
}
