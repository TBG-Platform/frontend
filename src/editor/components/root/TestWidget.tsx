import { NonIdealState } from '@blueprintjs/core';
import React from 'react';
import { TestState } from '../../state/panels/TestState';

interface Props {
  testState: TestState;
}

export class TestWidget extends React.Component<Props> {
  public render() {
    const { testState } = this.props;

    return (
      <div className={'test-widget'}>
        <NonIdealState
          icon={'widget'}
          title={'No widgets selected'}
          description={`Test state value - ${testState.message}`}
        />
      </div>
    );
  }
}
