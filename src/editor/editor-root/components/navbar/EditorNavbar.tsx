import { Menu, MenuItem, Position } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';
import { AppState } from '../../../../AppState';
import { DuiPanelContainerFlow } from '../../../dockable-ui/state/DuiPanelContainer';

import './editor-navbar.scss';

interface Props {
  appState: AppState;
}

@observer
export class EditorNavbar extends React.Component<Props> {
  public render() {
    return (
      <div className={'editor-navbar'}>
        {this.renderFilesMenu()}
        {this.renderViewMenu()}
        {this.renderLayoutMenu()}
      </div>
    );
  }

  private renderFilesMenu() {
    return (
      <Popover2
        position={Position.BOTTOM}
        minimal
        className={'menu-root-wrapper'}
        content={
          <Menu>
            <MenuItem text={'Save'} disabled />
            <MenuItem text={'Save as'} disabled />
            <MenuItem text={'Export'} disabled />
          </Menu>
        }
      >
        <div className={'menu-root'}>File</div>
      </Popover2>
    );
  }

  private renderViewMenu() {
    return (
      <Popover2
        position={Position.BOTTOM}
        minimal
        className={'menu-root-wrapper'}
        content={
          <Menu>
            <MenuItem text={'Story graph'} disabled />
            <MenuItem text={'Page editor'} disabled />
            <MenuItem text={'Details inspector'} disabled />
          </Menu>
        }
      >
        <div className={'menu-root'}>View</div>
      </Popover2>
    );
  }

  private renderLayoutMenu() {
    const { appState } = this.props;

    return (
      <Popover2
        position={Position.BOTTOM}
        minimal
        className={'menu-root-wrapper'}
        content={
          <Menu>
            <MenuItem
              text={'Three column'}
              onClick={() => appState.dockableUiState.setFlatLayout(3)}
            />
            <MenuItem
              text={'Three row'}
              onClick={() =>
                appState.dockableUiState.setFlatLayout(3, DuiPanelContainerFlow.COLUMN)
              }
            />
            <MenuItem
              text={'Nested 3'}
              onClick={() => appState.dockableUiState.setNestedLayout()}
            />
          </Menu>
        }
      >
        <div className={'menu-root'}>Layout</div>
      </Popover2>
    );
  }
}
