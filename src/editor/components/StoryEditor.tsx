import { Button, Dialog, Icon, Intent } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { StoryEditorState } from '../state/StoryEditorState';
import { DetailsPanel } from './details-panel/DetailsPanel';
import { EditorNavbar } from './navbar/EditorNavbar';
import { PageNavbar } from './navbar/PageNavbar';
import { PageDisplay } from './page/PageDisplay';

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
        <div className={'editor-navbar-area'}>
          <EditorNavbar storyEditorState={storyEditorState} />
        </div>
        <div className={'page-navbar-area'}>
          <PageNavbar storyEditorState={storyEditorState} />
        </div>

        <div className={'page-area'}>
          <div className={'page-edit-area'}>
            <PageDisplay page={storyEditorState.story.selectedPage} />
          </div>
          <div className={'page-details-panel'}>
            <DetailsPanel storyEditorState={storyEditorState} />
          </div>
        </div>
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
