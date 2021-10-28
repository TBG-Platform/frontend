import { Menu, MenuItem, Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';
import { Position } from 'react-flow-renderer';

import './dui-panel-frame.scss';

interface Props {}

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
    return (
      <Popover2
        position={Position.Bottom}
        content={
          <Menu>
            <MenuItem text={'Split right'} icon={'add-column-right'} />
            <MenuItem text={'Split bottom'} icon={'add-row-bottom'} />
            <MenuItem text={'Delete panel'} icon={'trash'} />
          </Menu>
        }
      >
        <Button icon={'more'} small minimal />
      </Popover2>
    );
  }
}
