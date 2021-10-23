import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { AppState } from './AppState';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return (
      <Button
        icon={'add'}
        text={`Clicks: ${this.appState.count}`}
        onClick={() => this.appState.incCount()}
      />
    );
  }
}
