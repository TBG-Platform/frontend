import { observer } from 'mobx-react';
import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { StoryGraphState } from '../state/StoryGraphState';
import { StoryGraphToolbar } from './StoryGraphToolbar';

import './story-graph.scss';

interface Props {
  storyGraphState: StoryGraphState;
}

@observer
export class StoryGraph extends React.Component<Props> {
  public render() {
    const { storyGraphState } = this.props;

    return (
      <div className={'story-graph'}>
        <div className={'graph-toolbar-area'}>
          <StoryGraphToolbar />
        </div>

        <div className={'graph-area-container'}>
          <div className={'graph-area'}>
            <ReactFlow nodesConnectable={false} elements={storyGraphState.elements} />
          </div>
        </div>
      </div>
    );
  }
}
