import React from 'react';
import {
  DuiPanelContainer,
  DuiPanelContainerFlow,
} from '../../state/dockable-ui/DuiPanelContainer';

import './dui-panel-resizer.scss';

interface Props {
  container: DuiPanelContainer;
  resizerIndex: number;
}

export class DuiPanelResizer extends React.Component<Props> {
  private resizeRef = React.createRef<HTMLDivElement>();

  public render() {
    const { container } = this.props;

    const resizeClass = container.flow === DuiPanelContainerFlow.ROW ? 'vertical' : 'horizontal';

    return (
      <div
        ref={this.resizeRef}
        className={'resize-bar ' + resizeClass}
        onMouseDown={this.onResizeMouseDown}
      ></div>
    );
  }

  private onResizeMouseDown = () => {
    document.addEventListener('mousemove', this.onResizeMouseMove);
    document.addEventListener('mouseup', this.onResizeMouseUp);
  };

  private onResizeMouseMove = (e: MouseEvent) => {
    const { container, resizerIndex } = this.props;

    container.resizeChildren(e, resizerIndex, this.resizeRef.current);
  };

  private onResizeMouseUp = () => {
    document.removeEventListener('mousemove', this.onResizeMouseMove);
    document.removeEventListener('mouseup', this.onResizeMouseUp);
  };
}
