import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';

import { StoryEditorState } from '../../state/StoryEditorState';

import './page-display.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class PageDisplay extends React.Component<Props> {
  private pageRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.pageRef.current) {
      this.props.storyEditorState.setPageDisplay(this.pageRef.current);
    }
  }

  public render() {
    const { storyEditorState } = this.props;

    const pageStyle: CSSProperties = {
      cursor: this.getCursorClass(),
    };

    return <div ref={this.pageRef} className={'page-display'}></div>;
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
