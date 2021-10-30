import { Icon } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { PageItemDetails } from './page-item-details/PageItemDetails';
import { DetailsPanelNavbar } from './DetailsPanelNavbar';
import { DetailsPanelFocus, DetailsPanelState } from '../../state/DetailsPanelState';
import { StoryEditorState } from '../../state/StoryEditorState';

import './details-panel.scss';
import { StoryGraphDetails } from '../../story-graph/components/StoryGraphDetails';

interface Props {
  storyEditorState: StoryEditorState;
  detailsPanelState: DetailsPanelState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { storyEditorState, detailsPanelState } = this.props;

    let panelContent: JSX.Element = undefined;

    switch (detailsPanelState.focus) {
      case DetailsPanelFocus.PAGE_ITEM:
        const pageItem = storyEditorState.story?.selectedPage?.selectedItem;
        panelContent = <PageItemDetails pageItem={pageItem} />;
        break;
      case DetailsPanelFocus.STORY_GRAPH:
        panelContent = <StoryGraphDetails storyGraphState={storyEditorState.storyGraphState} />;
        break;
    }

    return (
      <div className={'details-panel'} style={{ width: `${detailsPanelState.width}px` }}>
        <div className={'resize-bar'}>
          <Icon
            className={'resize-handle'}
            icon={'drag-handle-vertical'}
            onMouseDown={this.onMouseDown}
            draggable={'false'}
          />
        </div>
        <div className={'details-panel-main'}>
          <div className={'details-panel-navbar-area'}>
            <DetailsPanelNavbar
              storyEditorState={storyEditorState}
              detailsPanelState={detailsPanelState}
            />
          </div>

          <div className={'details-panel-content'}>{panelContent}</div>
        </div>
      </div>
    );
  }

  private onMouseDown = () => {
    document.body.style.cursor = 'ew-resize';

    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  };

  private onMouseMove = (e: MouseEvent) => {
    // Window size - mousePos is new width
    const width = window.screen.width - e.clientX;
    this.props.detailsPanelState.setWidth(width);
  };

  private onMouseUp = (e: MouseEvent) => {
    document.body.style.cursor = 'default';

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  };
}
