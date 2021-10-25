import { observer } from 'mobx-react';
import React from 'react';

import { StoryEditorState } from '../../state/StoryEditorState';

import './details-panel-navbar.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class DetailsPanelNavbar extends React.Component<Props> {
  public render() {
    return <div className={'details-panel-navbar'}></div>;
  }
}
