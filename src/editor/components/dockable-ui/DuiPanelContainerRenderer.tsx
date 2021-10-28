import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { DockableUIState } from '../../state/dockable-ui/DockableUIState';
import {
  DuiPanelContainer,
  DuiPanelContainerChild,
} from '../../state/dockable-ui/DuiPanelContainer';

import './dui-panel-container-renderer.scss';

interface Props {
  duiPanelContainer: DuiPanelContainer;
  duiState: DockableUIState;
  renderPanel: (panelId: string, containerId: string) => JSX.Element;
}

@observer
export class DuiPanelContainerRenderer extends React.Component<Props> {
  public render() {
    const { duiPanelContainer } = this.props;

    console.log('container render', duiPanelContainer.id);

    // Render a wrapper div for each child

    const containerStyle: CSSProperties = {
      flexDirection: duiPanelContainer.flow,
    };

    return (
      <div className={'dui-panel-container-renderer'} style={containerStyle}>
        {duiPanelContainer.children.map((child) => this.renderChild(child))}
      </div>
    );
  }

  private renderChild(child: DuiPanelContainerChild) {
    const { duiPanelContainer, duiState, renderPanel } = this.props;

    const childStyle: CSSProperties = {
      flexBasis: child.basis + '%',
    };

    // Child body - either a panel or container
    let childBody: JSX.Element = undefined;
    const container = duiState.getContainer(child.id);
    if (container) {
      // Render another container
      childBody = (
        <DuiPanelContainerRenderer
          duiPanelContainer={container}
          duiState={duiState}
          renderPanel={renderPanel}
        />
      );
    } else {
      // Render the panel
      childBody = renderPanel(child.id, duiPanelContainer.id);
    }

    return (
      <div key={'container-child-' + child.id} className={'container-child'} style={childStyle}>
        {childBody}
      </div>
    );
  }
}
