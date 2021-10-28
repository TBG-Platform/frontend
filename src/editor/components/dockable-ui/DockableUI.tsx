import React from 'react';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';
import { DuiPanelContainerRenderer } from './DuiPanelContainerRenderer';

import './dockable-ui.scss';

interface Props {
  duiState: DockableUIState;
}

export class DockableUI extends React.Component<Props> {
  public render() {
    const { duiState } = this.props;

    return (
      <div className={'dockable-ui-root'}>
        {duiState.rootContainer && (
          <DuiPanelContainerRenderer
            duiPanelContainer={duiState.rootContainer}
            duiState={duiState}
          />
        )}
      </div>
    );
  }
}
