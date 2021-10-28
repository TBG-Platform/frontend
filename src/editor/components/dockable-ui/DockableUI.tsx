import React from 'react';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';
import { DuiPanelContainerRenderer } from './DuiPanelContainerRenderer';

import './dockable-ui.scss';
import { observer } from 'mobx-react';

interface Props {
  duiState: DockableUIState;
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
          />
        )}
      </div>
    );
  }
}
