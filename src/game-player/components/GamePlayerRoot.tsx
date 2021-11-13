import './game-player-root.scss';

import React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { GamePageItemWidget } from './GamePageItemWidget';
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
      <GamePageItemWidget key={`gpi-${gpi.id}`} stageWidth={this.stageWidth} pageItem={gpi} />
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
}
