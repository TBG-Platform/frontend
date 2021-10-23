import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Page } from '../../state/Page';
import { StoryEditorState } from '../../state/StoryEditorState';

import './page-display.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class PageDisplay extends React.Component<Props> {
  public render() {
    const { storyEditorState } = this.props;

    const pageStyle: CSSProperties = {
      cursor: this.getCursorClass(),
    };

    return <div className={'page-display'} style={pageStyle}></div>;
  }

  private getCursorClass() {
    const { storyEditorState } = this.props;

    let cursor = 'default';

    if (storyEditorState.addingTextBlock) {
      cursor = 'crosshair';
    }

    return cursor;
  }
}
