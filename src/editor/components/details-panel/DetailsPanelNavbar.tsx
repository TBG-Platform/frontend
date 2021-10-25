import { Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
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
        <Tooltip2 className={'nav-item-container'} content={'Page item details'}>
          <div
            className={'nav-item ' + this.getNavItemSelectedClass(DetailsPanelFocus.PAGE_ITEM)}
            onClick={() => detailsPanelState.setFocus(DetailsPanelFocus.PAGE_ITEM)}
          >
            <Icon icon={'widget'} />
          </div>
        </Tooltip2>

        <Tooltip2 className={'nav-item-container'} content={'Story graph'}>
          <div
            className={'nav-item ' + this.getNavItemSelectedClass(DetailsPanelFocus.STORY_GRAPH)}
            onClick={() => detailsPanelState.setFocus(DetailsPanelFocus.STORY_GRAPH)}
          >
            <Icon icon={'diagram-tree'} />
          </div>
        </Tooltip2>
      </div>
    );
  }

  private getNavItemSelectedClass(focus: DetailsPanelFocus) {
    const { detailsPanelState } = this.props;

    return detailsPanelState.isFocusSelected(focus) ? 'selected' : '';
  }
}
