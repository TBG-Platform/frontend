import { Menu, MenuItem, Button, Divider } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';
import { Position } from 'react-flow-renderer';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';
import { DuiPanel, DuiPanelTab } from '../../state/dockable-ui/DuiPanel';
import { DuiPanelContainerFlow } from '../../state/dockable-ui/DuiPanelContainer';

import './dui-panel-frame.scss';

interface Props {
  containerId: string;
  panel: DuiPanel;
  duiState: DockableUIState;
  panelMenuItems?: (panelId: string) => JSX.Element;
}

@observer
export class DuiPanelFrame extends React.Component<Props> {
  public render() {
    const { panel } = this.props;

    return (
      <div className={'dui-panel-frame'}>
        <div className={'panel-frame-navbar'}>
          <div className={'navbar-tab-list'}>
            {panel.tabs.map((tab) => this.renderPanelTab(tab))}
          </div>

          <div className={'navbar-options'}>{this.renderPanelOptions()}</div>
        </div>

        <div className={'panel-frame-body'}></div>
      </div>
    );
  }

  private renderPanelTab(tab: DuiPanelTab) {
    console.log('renderPanelTab');

    return (
      <div key={`panel-tab-${tab.id}`} id={tab.id} className={'panel-tab'} draggable={'true'}>
        {tab.label}
      </div>
    );
  }

  private renderPanelOptions() {
    const { containerId, panel, duiState, panelMenuItems } = this.props;

    return (
      <Popover2
        position={Position.Bottom}
        content={
          <Menu>
            {panelMenuItems && (
              <>
                {panelMenuItems(panel.id)}
                <Divider />
              </>
            )}

            <MenuItem
              text={'Add panel right'}
              icon={'add-column-right'}
              onClick={() => duiState.splitPanel(containerId, panel.id, DuiPanelContainerFlow.ROW)}
            />
            <MenuItem
              text={'Add panel below'}
              icon={'add-row-bottom'}
              onClick={() =>
                duiState.splitPanel(containerId, panel.id, DuiPanelContainerFlow.COLUMN)
              }
            />
            <MenuItem
              text={'Close panel'}
              icon={'delete'}
              onClick={() => duiState.deletePanel(containerId, panel.id)}
            />
          </Menu>
        }
      >
        <Button icon={'more'} small minimal />
      </Popover2>
    );
  }
}
