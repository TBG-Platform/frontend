import { observer } from 'mobx-react';
import React from 'react';
import { StoryEditorState } from '../../state/StoryEditorState';

import './details-panel.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { storyEditorState } = this.props;

    let panelContent: JSX.Element = undefined;

    return <div className={'details-panel'}></div>;
  }
}
