import { observer } from 'mobx-react';
import React from 'react';
import { PanelViewState } from '../../state/PanelViewState';
import { PanelContainerDisplay } from './PanelContainerDisplay';

import './editor-root.scss';

interface Props {
  panelViewState: PanelViewState;
}

@observer
export class EditorRoot extends React.Component<Props> {
  public render() {
    const { panelViewState } = this.props;

    return (
      <div className={'editor-root'}>
        <div className={'editor-navbar-area'}>navbar here</div>
        <div className={'editor-main-area'}>
          <PanelContainerDisplay panelContainer={panelViewState.panelTree} />
        </div>
      </div>
    );
  }
}
