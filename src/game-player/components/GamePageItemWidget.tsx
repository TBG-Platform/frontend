import './game-page-item-widget.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { GamePageItem } from '../state/GamePageItem';

interface Props {
  stageWidth: number;
  pageItem: GamePageItem;
}

@observer
export class GamePageItemWidget extends React.Component<Props> {
  public render() {
    const { pageItem } = this.props;

    return (
      <div className={'game-page-item-widget'} style={{ ...pageItem.settings }}>
        <div
          className={'gpi-text'}
          style={{ ...pageItem.textSettings, fontSize: this.getFontSize() }}
        >
          {pageItem.text}
        </div>
      </div>
    );
  }

  private getFontSize() {
    const { stageWidth, pageItem } = this.props;

    const w = stageWidth;
    const s = parseFloat(pageItem.fontSizePercent);

    const fontSize = (w / 100) * s;

    return fontSize + 'px';
  }
}
