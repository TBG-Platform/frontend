import { Icon } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelFocus, StoryEditorState } from '../../state/StoryEditorState';
import { PageItemDetails } from './page-item-details/PageItemDetails';

import './details-panel.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { storyEditorState } = this.props;

    let panelContent: JSX.Element = undefined;

    switch (storyEditorState.detailsPanelFocus) {
      case DetailsPanelFocus.PAGE_ITEM:
        const pageItem = storyEditorState.story?.selectedPage?.selectedItem;
        if (pageItem) {
          panelContent = <PageItemDetails pageItem={pageItem} />;
        }

        break;
    }

    return (
      <div className={'details-panel'} style={{ width: `${storyEditorState.detailsPanelWidth}px` }}>
        <div className={'resize-bar'}>
          <Icon
            className={'resize-handle'}
            icon={'drag-handle-vertical'}
            onMouseDown={this.onMouseDown}
            draggable={'false'}
          />
        </div>
        <div className={'details-panel-content'}>{panelContent}</div>
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
    this.props.storyEditorState.setDetailsPanelWidth(width);
  };

  private onMouseUp = (e: MouseEvent) => {
    document.body.style.cursor = 'default';

    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  };
}
