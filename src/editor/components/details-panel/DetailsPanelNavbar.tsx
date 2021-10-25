import { Icon } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { DetailsPanelFocus, DetailsPanelState } from '../../state/DetailsPanelState';

import { StoryEditorState } from '../../state/StoryEditorState';

import './details-panel-navbar.scss';

interface Props {
  storyEditorState: StoryEditorState;
  detailsPanelState: DetailsPanelState;
}

@observer
export class DetailsPanelNavbar extends React.Component<Props> {
  public render() {
    const { detailsPanelState } = this.props;

    return (
      <div className={'details-panel-navbar'}>
        <div className={'nav-item ' + this.getNavItemSelectedClass(DetailsPanelFocus.PAGE_ITEM)}>
          <Icon icon={'widget'} />
        </div>
      </div>
    );
  }

  private getNavItemSelectedClass(focus: DetailsPanelFocus) {
    const { detailsPanelState } = this.props;

    return detailsPanelState.isFocusSelected(focus) ? 'selected' : '';
  }
}
