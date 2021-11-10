import './editor-root.scss';

import React from 'react';
import { Button, MenuItem, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { AddPageDialog } from '../../dialogs/add-page-dialog/components/AddPageDialog';
import { DockableUI } from '../../dockable-ui/components/DockableUI';
import { EditorNavbar } from './EditorNavbar';
import { EditorRootState } from '../state/EditorRootState';
import { PanelTabType } from '../state/PanelTabType';
import { SaveLayoutDialog } from '../../dialogs/save-layout-dialog/components/SaveLayoutDialog';
import { TabBodyRenderer } from './TabBodyRenderer';

interface Props {
  editorState: EditorRootState;
}

@observer
export class EditorRoot extends React.Component<Props> {
  public render() {
    const { editorState } = this.props;

    return (
      <div className={'editor-root'}>
        {/* Dialogs */}
        <AddPageDialog
          dialogViewState={editorState.dialogViewState}
          addPage={editorState.addPage}
        />
        <SaveLayoutDialog
          dialogViewState={editorState.dialogViewState}
          saveLayout={editorState.saveLayout}
        />

        <div className={'editor-navbar-area'}>
          <EditorNavbar editorState={editorState} />
        </div>
        <div className={'editor-main-area'}>
          <DockableUI
            duiState={editorState.dockableUiState}
            renderTabBody={this.renderTabBody}
            renderPanelMenuItems={this.renderPanelMenuItems}
            renderNoPanels={this.renderNoPanels}
          />
        </div>
      </div>
    );
  }

  private renderPanelMenuItems = (panelId: string) => {
    const { editorState } = this.props;

    return (
      <>
        <MenuItem
          icon={'diagram-tree'}
          text={'Story graph'}
          onClick={() => editorState.addTab(PanelTabType.STORY_GRAPH, panelId)}
        />
        <MenuItem
          icon={'manual'}
          text={'Page editor'}
          onClick={() => editorState.addTab(PanelTabType.PAGE_EDITOR, panelId)}
        />
        <MenuItem
          icon={'search-template'}
          text={'Page inspector'}
          onClick={() => editorState.addTab(PanelTabType.PAGE_INSPECTOR, panelId)}
        />
      </>
    );
  };

  private renderTabBody = (tabId: string) => {
    const { editorState } = this.props;

    // Get the type of tab we're rendering
    const tab = editorState.getTab(tabId);
    if (!tab) {
      return;
    }

    // Get the component for this tab type
    const content = TabBodyRenderer.makeTabRenderer(tab, editorState);

    return <div className={'tab-body'}>{content}</div>;
  };

  private renderNoPanels = () => {
    const { editorState } = this.props;
    const { dockableUiState } = editorState;

    return (
      <div className={'no-panels-screen'}>
        <NonIdealState
          icon={'page-layout'}
          title={'No panels'}
          description={'You have no panels! Click here to add one, or choose a layout.'}
          action={
            <Button
              icon={'add'}
              text={'Add a panel'}
              onClick={() => dockableUiState.setFlatLayout(1)}
            />
          }
        />
      </div>
    );
  };
}
