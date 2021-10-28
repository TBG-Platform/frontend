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

    return (
      <div className={'dockable-ui-root'}>
        {duiState.rootContainer && (
          <DuiPanelContainerRenderer
            key={`dpcr-${duiState.rootContainer.id}`}
            duiPanelContainer={duiState.rootContainer}
            duiState={duiState}
            renderPanel={(panelId: string, containerId: string) =>
              this.renderPanel(panelId, containerId)
            }
          />
        )}
      </div>
    );
  }

  private renderPanel = (panelId: string, containerId: string) => {
    const { duiState } = this.props;

    return <DuiPanelFrame containerId={containerId} panelId={panelId} duiState={duiState} />;
  };
}
