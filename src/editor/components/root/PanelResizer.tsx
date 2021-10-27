import { observer } from 'mobx-react';
import React from 'react';
import { PanelContainer, PanelFlow } from '../../state/panels/PanelContainer';

import './panel-resizer.scss';

interface Props {
  panelContainer: PanelContainer;
}

@observer
export class PanelResizer extends React.Component<Props> {
  public render() {
    const { panelContainer } = this.props;

    const resizeClass = panelContainer.flow === PanelFlow.ROW ? 'vertical' : 'horizontal';
    return (
      <div
        key={`pc-${panelContainer.id}-resizer`}
        className={'resize-bar ' + resizeClass}
        draggable={'false'}
        onMouseDown={this.onResizeMouseDown}
      ></div>
    );
  }

  private onResizeMouseDown = () => {
    console.log('on resize mouse down');

    document.addEventListener('mousemove', this.onResizeMouseMove);
    document.addEventListener('mouseup', this.onResizeMouseUp);
  };

  private onResizeMouseMove = (e: MouseEvent) => {
    const { panelContainer } = this.props;

    // Find out which axis we care about; horizontal or vertical resize?
    let mousePos = e.clientX;
    const panelRect = panelContainer.div.getBoundingClientRect();
    let panelStart = panelRect.left;
    let panelMax = panelRect.width;

    if (panelContainer.flow === PanelFlow.COLUMN) {
      mousePos = e.clientY;
      panelStart = panelRect.top;
      panelMax = panelRect.height;
    }

    // Find out how far away the mouse is from panel start as percentage
    const mouseDelta = mousePos - panelStart;
    const resizeBarPercent = (mouseDelta / panelMax) * 100;

    panelContainer.setSplit(resizeBarPercent);
  };

  private onResizeMouseUp = () => {
    document.removeEventListener('mousemove', this.onResizeMouseMove);
    document.removeEventListener('mouseup', this.onResizeMouseUp);
  };
}
