import { observer } from 'mobx-react';
import React from 'react';

import { EditableText } from '../../../common/inputs/EditableText';
import { StoryEditorState } from '../../state/StoryEditorState';

import './editor-navbar.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class EditorNavbar extends React.Component<Props> {
  public render() {
    const { storyEditorState } = this.props;
    const story = storyEditorState.story;

    return (
      <div className={'editor-navbar'}>
        <EditableText text={story.name} onChange={story.setName} label={'Story'} />
      </div>
    );
  }
}
