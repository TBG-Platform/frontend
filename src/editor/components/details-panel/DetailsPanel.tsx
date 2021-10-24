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

    return <div className={'details-panel'}>{panelContent}</div>;
  }
}
