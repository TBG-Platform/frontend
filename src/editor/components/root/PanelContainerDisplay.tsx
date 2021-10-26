import React, { CSSProperties } from 'react';
import { PanelContainer, PanelFlow } from '../../state/PanelViewState';
import { PanelDisplay } from './PanelDisplay';

import './panel-container-display.scss';

interface Props {
  panelContainer: PanelContainer;
}

export class PanelContainerDisplay extends React.Component<Props> {
  public render() {
    const { panelContainer } = this.props;

    const content: JSX.Element[] = [];

    if (panelContainer.a) {
      if (PanelContainer.isPanel(panelContainer.a)) {
        content.push(<PanelDisplay panel={panelContainer.a} />);
      } else if (PanelContainer.isPanelContainer(panelContainer.a)) {
        content.push(<PanelContainerDisplay panelContainer={panelContainer.a} />);
      }
    }

    if (panelContainer.b) {
      if (PanelContainer.isPanel(panelContainer.b)) {
        content.push(<PanelDisplay panel={panelContainer.b} />);
      } else if (PanelContainer.isPanelContainer(panelContainer.b)) {
        content.push(<PanelContainerDisplay panelContainer={panelContainer.b} />);
      }
    }

    // If the container has an a and a b, add a resize bar between them
    if (panelContainer.a && panelContainer.b) {
      const resizeClass = panelContainer.flow === PanelFlow.ROW ? 'vertical' : 'horizontal';
      const resizer = <div className={'resize-bar ' + resizeClass}></div>;

      content.splice(1, 0, resizer);
    }

    const panelContainerStyle: CSSProperties = {
      flexDirection: panelContainer.flow,
    };

    const panelContRef = React.createRef<HTMLDivElement>();

    return (
      <div ref={panelContRef} className={'panel-container'} style={panelContainerStyle}>
        {content}
      </div>
    );
  }
}
