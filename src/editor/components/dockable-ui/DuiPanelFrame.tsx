import { Menu, MenuItem, Button, Divider } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';
import { Position } from 'react-flow-renderer';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';
import { DuiPanelContainerFlow } from '../../state/dockable-ui/DuiPanelContainer';

import './dui-panel-frame.scss';

interface Props {
  containerId: string;
  panelId: string;
  duiState: DockableUIState;
  panelMenuItems?: () => JSX.Element;
}

@observer
export class DuiPanelFrame extends React.Component<Props> {
  public render() {
    return (
      <div className={'dui-panel-frame'}>
        <div className={'panel-frame-navbar'}>
          <div className={'navbar-tab-list'}></div>

          <div className={'navbar-options'}>{this.renderPanelOptions()}</div>
        </div>

        <div className={'panel-frame-body'}></div>
      </div>
    );
  }

  private renderPanelOptions() {
    const { containerId, panelId, duiState, panelMenuItems } = this.props;

    return (
      <Popover2
        position={Position.Bottom}
        content={
          <Menu>
            {panelMenuItems && (
              <>
                {panelMenuItems()}
                <Divider />
              </>
            )}

            <MenuItem
              text={'Add panel right'}
              icon={'add-column-right'}
              onClick={() => duiState.splitPanel(containerId, panelId, DuiPanelContainerFlow.ROW)}
            />
            <MenuItem
              text={'Add panel below'}
              icon={'add-row-bottom'}
              onClick={() =>
                duiState.splitPanel(containerId, panelId, DuiPanelContainerFlow.COLUMN)
              }
            />
            <MenuItem
              text={'Delete panel'}
              icon={'trash'}
              onClick={() => duiState.deletePanel(containerId, panelId)}
            />
          </Menu>
        }
      >
        <Button icon={'more'} small minimal />
      </Popover2>
    );
  }
}
