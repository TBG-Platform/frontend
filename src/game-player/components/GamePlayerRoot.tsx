import './game-player-root.scss';

import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { GamePageItem } from '../state/GamePageItem';
import { GamePlayerRootState } from '../state/GamePlayerRootState';

interface Props {
  gameState: GamePlayerRootState;
}

@observer
export class GamePlayerRoot extends React.Component<Props> {
  @observable private stageWidth = 0;
  private rootRef = React.createRef<HTMLDivElement>();
  private stageRef = React.createRef<HTMLDivElement>();
  private resizeObserver: ResizeObserver;
  private aspectRatio = 16 / 9;

  componentDidMount() {
    this.resizeObserver = new ResizeObserver(this.onResizeRoot);
    this.resizeObserver.observe(this.rootRef.current);
  }

  public render() {
    const { gameState } = this.props;

    return (
      <div ref={this.rootRef} className={'game-player-root'}>
        <div ref={this.stageRef} className={'game-stage'}>
          {this.stageWidth !== 0 && this.renderCurrentPage()}
        </div>
      </div>
    );
  }

  private renderCurrentPage() {
    return <div className={'game-page'}>{this.renderPageItems()}</div>;
  }

  private renderPageItems() {
    const { gameState } = this.props;

    return gameState.currentPage.items.map((gpi) => (
      <div key={`gpi-${gpi.id}`} className={'game-page-item'} style={{ ...gpi.settings }}>
        <div
          className={'game-page-item-text'}
          style={{ ...gpi.textSettings, fontSize: this.getFontSize(gpi) }}
        >
          {gpi.text}
        </div>
      </div>
    ));
  }

  @action private onResizeRoot = () => {
    if (!this.rootRef.current || !this.stageRef.current) {
      return;
    }

    const root = this.rootRef.current;
    const stage = this.stageRef.current;

    const isTall = root.clientWidth / root.clientHeight < this.aspectRatio;

    stage.style.width = isTall ? '100%' : 'auto';
    stage.style.height = isTall ? 'auto' : '100%';

    this.stageWidth = stage.getBoundingClientRect().width;
  };

  private getFontSize = (gpi: GamePageItem) => {
    const w = this.stageWidth;
    const s = parseFloat(gpi.fontSizePercent);

    const fontSize = (w / 100) * s;

    return fontSize + 'px';
  };
}
