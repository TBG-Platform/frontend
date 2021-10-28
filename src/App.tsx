import { observer } from 'mobx-react';
import React from 'react';
import { AppState } from './AppState';

import { EditorRoot } from './editor/components/root/EditorRoot';

import './app.scss';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return <EditorRoot appState={this.appState} />;
  }
}
