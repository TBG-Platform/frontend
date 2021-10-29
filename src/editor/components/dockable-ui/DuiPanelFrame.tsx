import { Menu, MenuItem, Button, Divider } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';
import { Position } from 'react-flow-renderer';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';
import { DuiPanel, DuiPanelTab } from '../../state/dockable-ui/DuiPanel';
import { DuiPanelContainerFlow } from '../../state/dockable-ui/DuiPanelContainer';

import './dui-panel-frame.scss';

interface TabDragData {
  tabId: string;
  fromPanelId: string;
}

interface Props {
  containerId: string;
  panel: DuiPanel;
  duiState: DockableUIState;
  panelMenuItems?: (panelId: string) => JSX.Element;
}

@observer
export class DuiPanelFrame extends React.Component<Props> {
  private panelBodyRef = React.createRef<HTMLDivElement>();

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

        <div
          ref={this.panelBodyRef}
          className={'panel-frame-body'}
          onDragOver={this.onDragOverPanel}
          onDragLeave={this.onDragOverLeavePanel}
          onDrop={this.onDrop}
        ></div>
      </div>
    );
  }

  private renderPanelTab(tab: DuiPanelTab) {
    return (
      <div
        key={`panel-tab-${tab.id}`}
        id={tab.id}
        className={'panel-tab'}
        draggable={'true'}
        onDragStart={this.onDragStartTab}
        onDragEnd={this.onDragEndTab}
      >
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

  private onDragStartTab = (e: React.DragEvent<HTMLDivElement>) => {
    const { panel } = this.props;

    const target = e.target as HTMLDivElement;

    // Set the transfer data to hold tab id and 'from' panel
    const data: TabDragData = {
      tabId: target.id,
      fromPanelId: panel.id,
    };

    e.dataTransfer.setData('text', JSON.stringify(data));
  };

  private onDragEndTab = (_e: React.DragEvent<HTMLDivElement>) => {
    this.panelBodyRef.current?.classList.remove('hover-backdrop');
  };

  private onDragOverPanel = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Show the hover guide backdrop

    this.panelBodyRef.current?.classList.add('hover-backdrop');

    return false;
  };

  private onDragOverLeavePanel = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Due to tabs for this panel being nested, causes flicker otherwise
    if (e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
      return;
    }

    this.panelBodyRef.current.classList.remove('hover-backdrop');
  };

  private onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    this.panelBodyRef.current?.classList.remove('hover-backdrop');

    const data: TabDragData = JSON.parse(e.dataTransfer.getData('text'));

    console.log('drag data: ', data);

    e.dataTransfer.clearData();
  };
}
