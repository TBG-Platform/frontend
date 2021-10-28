import React from 'react';
import {
  DuiPanelContainer,
  DuiPanelContainerFlow,
} from '../../state/dockable-ui/DuiPanelContainer';

import './dui-panel-resizer.scss';

interface Props {
  container: DuiPanelContainer;
}

export class DuiPanelResizer extends React.Component<Props> {
  public render() {
    const { container } = this.props;

    const resizeClass = container.flow === DuiPanelContainerFlow.ROW ? 'vertical' : 'horizontal';

    return <div className={'resize-bar ' + resizeClass}></div>;
  }
}
