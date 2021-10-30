import { Button, MenuItem, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { PanelTabType } from '../state/PanelTabType';
import { TabBodyRenderer } from './TabBodyRenderer';
import { DockableUI } from '../../dockable-ui/components/DockableUI';
import { EditorNavbar } from './navbar/EditorNavbar';
import { EditorRootState } from '../state/EditorRootState';

import './editor-root.scss';

interface Props {
  editorState: EditorRootState;
}

@observer
export class EditorRoot extends React.Component<Props> {
  public render() {
    const { editorState } = this.props;

    return (
      <div className={'editor-root'}>
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
          text={'Add test tab'}
          onClick={() => editorState.addTab(PanelTabType.TEST, panelId)}
        />
        <MenuItem
          icon={'diagram-tree'}
          text={'Story graph'}
          onClick={() => editorState.addTab(PanelTabType.STORY_GRAPH, panelId)}
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
    const content = TabBodyRenderer.getTabBody(tab, editorState);

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
