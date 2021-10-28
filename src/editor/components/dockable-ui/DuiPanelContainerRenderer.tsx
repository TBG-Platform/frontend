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
}

@observer
export class DuiPanelContainerRenderer extends React.Component<Props> {
  public render() {
    const { duiPanelContainer } = this.props;

    // Render a wrapper div for each child

    return (
      <div className={'dui-panel-container-renderer'}>
        {duiPanelContainer.children.map((child) => this.renderChild(child))}
      </div>
    );
  }

  private renderChild(child: DuiPanelContainerChild) {
    const { duiState } = this.props;

    const childStyle: CSSProperties = {
      flexBasis: child.basis + '%',
    };

    // Child body - either a panel or container
    let childBody: JSX.Element = undefined;
    const container = duiState.getContainer(child.id);
    if (container) {
      // Render another container
      childBody = <DuiPanelContainerRenderer duiPanelContainer={container} duiState={duiState} />;
    } else {
      // Render the panel
    }

    return (
      <div
        key={'container-child-' + child.id}
        className={'container-child'}
        style={childStyle}
      ></div>
    );
  }
}
