import { observer } from 'mobx-react';
import React from 'react';
import { FitTextInput } from '../../../common/inputs/FitTextInput';
import { StoryEditorState } from '../../state/StoryEditorState';

import './editor-navbar.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class EditorNavbar extends React.Component<Props> {
  public render() {
    const { storyEditorState } = this.props;

    return <div className={'editor-navbar'}>{this.renderStoryName()}</div>;
  }

  private renderStoryName() {
    const { storyEditorState } = this.props;

    const story = storyEditorState.story;

    let content: JSX.Element = (
      <div className={'story-name'} onClick={story?.editName}>
        {story?.name}
      </div>
    );

    // Normal display or editing mode?
    if (story?.editingName) {
      content = (
        <FitTextInput value={story?.name} onChange={story.setName} inputFieldPadding={10} />
      );
    }

    return <div className={'story-name-container'}>{content}</div>;
  }
}
