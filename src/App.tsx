import './app.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { AppScreen, AppState } from './AppState';
import { EditorRoot } from './editor/editor-root/components/EditorRoot';
import { WebsiteRoot } from './website/website-root/components/WebsiteRoot';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return this.getAppScreen();
  }

  public getAppScreen() {
    switch (this.appState.appScreen) {
      case AppScreen.WEBSITE:
        return <WebsiteRoot websiteState={this.appState.websiteRootState} />;
      case AppScreen.EDITOR:
        return <EditorRoot editorState={this.appState.editorRootState} />;
    }
  }
}
