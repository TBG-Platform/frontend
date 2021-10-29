import { Button, MenuItem } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { PanelWidgetType } from '../../state/panels/PanelWidgetType';
import { PanelWidgetRenderer } from './PanelWidgetRenderer';
import { AppState } from '../../../AppState';
import { DockableUI } from '../dockable-ui/DockableUI';
import { DuiPanelContainerFlow } from '../../state/dockable-ui/DuiPanelContainer';
import { PanelTabType } from '../../state/panels/PanelTabType';

import './editor-root.scss';

interface Props {
  appState: AppState;
}

@observer
export class EditorRoot extends React.Component<Props> {
  public render() {
    const { appState } = this.props;

    return (
      <div className={'editor-root'}>
        <div className={'editor-navbar-area'}>{this.renderNavbarOptions()}</div>
        <div className={'editor-main-area'}>
          <DockableUI
            duiState={appState.dockableUiState}
            renderTabBody={this.renderTabBody}
            renderPanelMenuItems={this.renderPanelMenuItems}
          />
        </div>
      </div>
    );
  }

  private renderNavbarOptions() {
    const { appState } = this.props;
    const { dockableUiState } = appState;

    return (
      <>
        Horizontal:
        <Button text={'One panel'} onClick={() => dockableUiState.setFlatLayout(1)} />
        <Button text={'Two panel'} onClick={() => dockableUiState.setFlatLayout(2)} />
        <Button text={'Three panel'} onClick={() => dockableUiState.setFlatLayout(3)} />
        Vertical:
        <Button
          text={'One panel'}
          onClick={() => dockableUiState.setFlatLayout(1, DuiPanelContainerFlow.COLUMN)}
        />
        <Button
          text={'Two panel'}
          onClick={() => dockableUiState.setFlatLayout(2, DuiPanelContainerFlow.COLUMN)}
        />
        <Button
          text={'Three panel'}
          onClick={() => dockableUiState.setFlatLayout(3, DuiPanelContainerFlow.COLUMN)}
        />
        Nested:
        <Button text={'Nested 3'} onClick={() => dockableUiState.setNestedLayout()} />
      </>
    );
  }

  private renderPanelMenuItems = (panelId: string) => {
    const { appState } = this.props;

    return (
      <>
        <MenuItem
          text={'Add test tab'}
          onClick={() => appState.addTab(panelId, PanelTabType.TEST)}
        />
      </>
    );
  };

  private renderTabBody = (tabId: string) => {
    return <div className={'panel'}>{tabId}</div>;
  };
}
