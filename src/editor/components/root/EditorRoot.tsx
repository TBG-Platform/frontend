import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { PanelViewState } from '../../state/panels/PanelViewState';
import { PanelContainerDisplay } from './PanelContainerDisplay';
import { PanelWidgetType } from '../../state/panels/PanelWidgetType';
import { PanelWidgetRenderer } from './PanelWidgetRenderer';
import { AppState } from '../../../AppState';

import './editor-root.scss';

interface Props {
  panelViewState: PanelViewState;
  appState: AppState;
}

@observer
export class EditorRoot extends React.Component<Props> {
  public render() {
    const { panelViewState } = this.props;

    return (
      <div className={'editor-root'}>
        <div className={'editor-navbar-area'}>{this.renderNavbarOptions()}</div>
        <div className={'editor-main-area'}>
          <PanelContainerDisplay
            key={'pc-' + panelViewState.panelTree.id}
            panelContainer={panelViewState.panelTree}
            onFocusPanel={panelViewState.focusPanel}
            renderWidgetBody={this.renderWidgetBody}
          />
        </div>
      </div>
    );
  }

  private renderNavbarOptions() {
    const { panelViewState } = this.props;

    return (
      <>
        <Button text={'One panel'} onClick={panelViewState.setOnePanel} />
        <Button text={'Two panel LR'} onClick={panelViewState.setTwoPanelLR} />
        <Button text={'Two panel TB'} onClick={panelViewState.setTwoPanelTB} />
        <Button text={'Nested L,R-TB'} onClick={panelViewState.setLRTB} />
        <Button text={'Nested L-TB, R-TB'} onClick={panelViewState.setLTBRTB} />
        <Button text={'Test widget'} onClick={panelViewState.addPanelWidget} />
      </>
    );
  }

  private renderWidgetBody = (panelWidgetType: PanelWidgetType) => {
    return PanelWidgetRenderer.getRenderer(panelWidgetType, this.props.appState);
  };
}
