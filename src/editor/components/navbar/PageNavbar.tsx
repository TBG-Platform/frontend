import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { StandardButton } from '../../../common/buttons/StandardButton';

import { EditableText } from '../../../common/inputs/editable-text/EditableText';
import { StoryEditorState } from '../../state/StoryEditorState';

import './page-navbar.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class PageNavbar extends React.Component<Props> {
  public render() {
    const { storyEditorState } = this.props;

    const page = storyEditorState.story.selectedPage;

    return (
      <div className={'page-navbar'}>
        <EditableText
          text={page.name}
          onChange={page.setName}
          labelIcon={'document'}
          onBlur={storyEditorState.onRenamedPage}
        />

        <Divider className={'divider'} />

        <ButtonGroup minimal>
          <StandardButton
            icon={'widget'}
            outlined
            onClick={storyEditorState.toggleAddTextBlock}
            tooltipText={'Add page item'}
          />
        </ButtonGroup>
      </div>
    );
  }
}
