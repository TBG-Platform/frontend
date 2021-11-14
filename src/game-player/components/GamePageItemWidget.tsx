import './game-page-item-widget.scss';

import React from 'react';
import parse from 'html-react-parser';
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

    // Apply classes based on item props
    const interactive = pageItem.linkedPageId ? 'interactive' : '';

    const classes = ['game-page-item-widget', interactive];

    return (
      <div className={classes.join(' ')} style={{ ...pageItem.settings }}>
        <div className={'gpi-text'} onClick={() => pageItem.onClickItem(pageItem.linkedPageId)}>
          {parse(pageItem.text)}
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
