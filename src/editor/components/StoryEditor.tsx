import React from 'react';
import { StoryEditorState } from '../state/StoryEditorState';

import './story-editor.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

export class StoryEditor extends React.Component<Props> {
  public render() {
    return <div className={'story-editor'}></div>;
  }
}
