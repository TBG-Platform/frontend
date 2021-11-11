import './editor-navbar.scss';

import React from 'react';
import { Button, Divider, Intent, Menu, MenuItem, Position } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';

import { DuiPanelContainerFlow } from '../../dockable-ui/state/DuiPanelContainer';
import { EditorRootState } from '../state/EditorRootState';
import { PanelTabType } from '../state/PanelTabType';

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

        <Divider />

        {this.renderAddPage()}
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
            <MenuItem
              icon={'search-template'}
              text={'Page inspector'}
              onClick={() => editorState.addTab(PanelTabType.PAGE_INSPECTOR)}
            />
          </Menu>
        }
      >
        <div className={'menu-root'}>View</div>
      </Popover2>
    );
  }

  private renderLayoutMenu() {
    const { editorState } = this.props;

    // Get standard layout options
    const standardLayoutOptions = editorState.editorStorage.standardLayouts.map((layout, idx) => (
      <MenuItem
        key={`standard-layout-${idx}`}
        text={layout.name}
        onClick={() => editorState.loadLayout(layout)}
      />
    ));

    // Get user layout options
    const userLayoutOptions = editorState.editorStorage.userLayouts.map((layout, idx) => (
      <MenuItem
        key={`user-layout-${idx}`}
        text={layout.name}
        onClick={() => editorState.loadLayout(layout)}
      />
    ));

    return (
      <Popover2
        position={Position.BOTTOM}
        minimal
        className={'menu-root-wrapper'}
        content={
          <Menu>
            {userLayoutOptions.length > 0 && (
              <>
                {userLayoutOptions}
                <Divider />
              </>
            )}

            {standardLayoutOptions.length > 0 && (
              <>
                {standardLayoutOptions}
                <Divider />
              </>
            )}

            <MenuItem
              text={'Save layout'}
              onClick={editorState.startSaveLayout}
              disabled={!editorState.dockableUiState.hasLayout()}
            />
          </Menu>
        }
      >
        <div className={'menu-root'}>Layout</div>
      </Popover2>
    );
  }

  private renderAddPage() {
    const { editorState } = this.props;

    return (
      <div className={'add-page-button'}>
        <Button
          text={'Add page'}
          icon={'add'}
          intent={Intent.PRIMARY}
          small
          onClick={editorState.startAddPage}
        />
      </div>
    );
  }
}
