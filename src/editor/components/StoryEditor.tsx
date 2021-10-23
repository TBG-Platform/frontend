import { Button, Dialog, Icon, Intent } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { StoryEditorState } from '../state/StoryEditorState';

import './story-editor.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class StoryEditor extends React.Component<Props> {
  public render() {
    const { storyEditorState } = this.props;

    if (!storyEditorState.story) {
      return this.renderEntryDialog();
    }

    return (
      <div className={'story-editor'}>
        <div className={'navbar-area'}></div>
        <div className={'page-area'}></div>
      </div>
    );
  }

  private renderEntryDialog() {
    const { storyEditorState } = this.props;

    return (
      <div className={'entry-dialog-backdrop'}>
        <Dialog isOpen className={'entry-dialog'}>
          <Icon icon={'book'} size={50} />
          <h3>Story Editor</h3>
          <p>Create a new story or load an existing one</p>
          <Button
            icon={'add'}
            text={'Create story'}
            intent={Intent.PRIMARY}
            onClick={storyEditorState.createNewStory}
          />
          <Button icon={'document-open'} text={'Load story'} disabled />
        </Dialog>
      </div>
    );
  }
}
