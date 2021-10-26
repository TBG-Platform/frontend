import React, { CSSProperties } from 'react';
import { Panel, PanelContainer, PanelFlow } from '../../state/PanelViewState';
import { PanelDisplay } from './PanelDisplay';

import './panel-container-display.scss';

interface Props {
  panelContainer: PanelContainer;
}

export class PanelContainerDisplay extends React.Component<Props> {
  private panelContRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.panelContRef.current) {
      this.props.panelContainer.setDiv(this.panelContRef.current);
    }
  }

  public render() {
    const { panelContainer } = this.props;

    const content: JSX.Element[] = [];

    if (panelContainer.a) {
      content.push(this.getPanelOrContainer(panelContainer.a));
    }

    if (panelContainer.b) {
      content.push(this.getPanelOrContainer(panelContainer.b));
    }

    // If the container has an a and a b, add a resize bar between them
    if (panelContainer.a && panelContainer.b) {
      const resizeClass = panelContainer.flow === PanelFlow.ROW ? 'vertical' : 'horizontal';
      const resizer = (
        <div key={`pc-${panelContainer.id}-resizer`} className={'resize-bar ' + resizeClass}></div>
      );

      content.splice(1, 0, resizer);
    }

    const panelContainerStyle: CSSProperties = {
      flexDirection: panelContainer.flow,
    };

    return (
      <div ref={this.panelContRef} className={'panel-container'} style={panelContainerStyle}>
        {content}
      </div>
    );
  }

  private getPanelOrContainer(item: Panel | PanelContainer) {
    if (PanelContainer.isPanel(item)) {
      return <PanelDisplay key={'panel-' + item.id} panel={item} />;
    } else if (PanelContainer.isPanelContainer(item)) {
      return <PanelContainerDisplay key={'pc-' + item.id} panelContainer={item} />;
    } else {
      return undefined;
    }
  }

  private onResizeMouseDown = () => {
    document.addEventListener('mouseup', this.onResizeMouseUp);
    document.addEventListener('mousemove', this.onResizeMouseMove);
  };

  private onResizeMouseMove = (e: MouseEvent) => {
    // Find out which axis we care about; horizontal or vertical resize?
    // Use that axis to find out how far the mouse has moved from the resize bar's last position (mousePos - resizePos)
  };

  private onResizeMouseUp = () => {
    document.removeEventListener('mousemove', this.onResizeMouseMove);
    document.removeEventListener('mouseup', this.onResizeMouseUp);
  };
}
