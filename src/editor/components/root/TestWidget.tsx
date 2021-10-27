import { NonIdealState } from '@blueprintjs/core';
import React from 'react';

export class TestWidget extends React.Component {
  public render() {
    return (
      <div className={'test-widget'}>
        <NonIdealState
          icon={'widget'}
          title={'No widgets selected'}
          description={'Add a widget to this panel via the buttons at the top!'}
        />
      </div>
    );
  }
}
