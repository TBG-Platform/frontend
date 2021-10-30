import { observer } from 'mobx-react';
import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { StoryGraphState } from '../state/StoryGraphState';

import './story-graph-details.scss';

interface Props {
  storyGraphState: StoryGraphState;
}

@observer
export class StoryGraph extends React.Component<Props> {
  public render() {
    const { storyGraphState } = this.props;

    return (
      <div className={'story-graph-details'}>
        <ReactFlow nodesConnectable={false} elements={storyGraphState.elements} />
      </div>
    );
  }
}
