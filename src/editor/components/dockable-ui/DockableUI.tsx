import { observer } from 'mobx-react';
import React from 'react';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';
import { DuiPanelContainerRenderer } from './DuiPanelContainerRenderer';
import { DuiPanelFrame } from './DuiPanelFrame';

import './dockable-ui.scss';

interface Props {
  duiState: DockableUIState;
  renderPanelBody: (panelId: string) => JSX.Element;
}

@observer
export class DockableUI extends React.Component<Props> {
  public render() {
    const { duiState } = this.props;

    console.log('dock ui root render');

    return (
      <div className={'dockable-ui-root'}>
        {duiState.rootContainer && (
          <DuiPanelContainerRenderer
            duiPanelContainer={duiState.rootContainer}
            duiState={duiState}
            renderPanel={this.renderPanel}
          />
        )}
      </div>
    );
  }

  private renderPanel = (panelId: string) => {
    return <DuiPanelFrame />;
  };
}
