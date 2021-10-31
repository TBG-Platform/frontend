import { Menu, MenuItem, Position } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

import { DuiPanelContainerFlow } from '../../../dockable-ui/state/DuiPanelContainer';
import { EditorRootState } from '../../state/EditorRootState';
import { PanelTabType } from '../../state/PanelTabType';

import './editor-navbar.scss';
import { PageSelector } from './PageSelector';

interface Props {
  editorState: EditorRootState;
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
    const { editorState } = this.props;

    return (
      <Popover2
        position={Position.BOTTOM}
        minimal
        className={'menu-root-wrapper'}
        content={
          <Menu>
            <MenuItem
              icon={'diagram-tree'}
              text={'Story graph'}
              onClick={() => editorState.addTab(PanelTabType.STORY_GRAPH)}
            />

            <MenuItem
              icon={'manual'}
              text={'Page editor'}
              onClick={() => editorState.addTab(PanelTabType.PAGE_EDITOR)}
            />
            <MenuItem text={'Details inspector'} disabled />
          </Menu>
        }
      >
        <div className={'menu-root'}>View</div>
      </Popover2>
    );
  }

  private renderLayoutMenu() {
    const { editorState } = this.props;

    return (
      <Popover2
        position={Position.BOTTOM}
        minimal
        className={'menu-root-wrapper'}
        content={
          <Menu>
            <MenuItem
              text={'Three column'}
              onClick={() => editorState.dockableUiState.setFlatLayout(3)}
            />
            <MenuItem
              text={'Three row'}
              onClick={() =>
                editorState.dockableUiState.setFlatLayout(3, DuiPanelContainerFlow.COLUMN)
              }
            />
            <MenuItem
              text={'Nested 3'}
              onClick={() => editorState.dockableUiState.setNestedLayout()}
            />
          </Menu>
        }
      >
        <div className={'menu-root'}>Layout</div>
      </Popover2>
    );
  }
}