import { Panel } from '../../state/PanelViewState';
import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { PanelContainer, PanelViewState } from '../../state/PanelViewState';

import './editor-root.scss';

interface Props {
  panelViewState: PanelViewState;
}

@observer
export class EditorRoot extends React.Component<Props> {
  public render() {
    const { panelViewState } = this.props;

    return (
      <div className={'editor-root'}>
        <div className={'editor-navbar-area'}>navbar here</div>
        <div className={'editor-main-area'}>
          {this.renderPanelContainer(panelViewState.panelTree)}
        </div>
      </div>
    );
  }

  private renderPanelContainer(panelContainer: PanelContainer) {
    const content: JSX.Element[] = [];

    if (panelContainer.a) {
      content.push(
        PanelContainer.isPanel(panelContainer.a)
          ? this.renderPanel(panelContainer.a)
          : this.renderPanelContainer(panelContainer.a)
      );
    }

    if (panelContainer.b) {
      content.push(
        PanelContainer.isPanel(panelContainer.b)
          ? this.renderPanel(panelContainer.b)
          : this.renderPanelContainer(panelContainer.b)
      );
    }

    const panelContainerStyle: CSSProperties = {
      flexDirection: panelContainer.flow,
    };

    return (
      <div className={'panel-container'} style={panelContainerStyle}>
        {content}
      </div>
    );
  }

  private renderPanel(panel: Panel) {
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
