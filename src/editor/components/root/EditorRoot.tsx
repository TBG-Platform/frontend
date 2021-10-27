import { observer } from 'mobx-react';
import React from 'react';
import { PanelViewState } from '../../state/PanelViewState';
import { PanelContainerDisplay } from './PanelContainerDisplay';

import './editor-root.scss';
import { Button } from '@blueprintjs/core';

interface Props {
  panelViewState: PanelViewState;
}

@observer
export class EditorRoot extends React.Component<Props> {
  public render() {
    const { panelViewState } = this.props;

    return (
      <div className={'editor-root'}>
        <div className={'editor-navbar-area'}>{this.renderNavbarOptions()}</div>
        <div className={'editor-main-area'}>
          <PanelContainerDisplay
            key={'pc-' + panelViewState.panelTree.id}
            panelContainer={panelViewState.panelTree}
          />
        </div>
      </div>
    );
  }

  private renderNavbarOptions() {
    const { panelViewState } = this.props;

    return (
      <>
        <Button text={'Two panel LR'} onClick={panelViewState.setTwoPanelLR} />
        <Button text={'Two panel TB'} onClick={panelViewState.setTwoPanelTB} />
        <Button text={'Nested L,R-TB'} onClick={panelViewState.setLRTB} />
        <Button text={'Nested L-TB, R-TB'} onClick={panelViewState.setLTBRTB} />
      </>
    );
  }
}
