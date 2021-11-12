import './game-player-root.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { GamePlayerRootState } from '../state/GamePlayerRootState';

interface Props {
  gameState: GamePlayerRootState;
}

@observer
export class GamePlayerRoot extends React.Component<Props> {
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

    console.log('game rendering', gameState);

    return (
      <div ref={this.rootRef} className={'game-player-root'}>
        <div ref={this.stageRef} className={'game-stage'}></div>
      </div>
    );
  }

  private onResizeRoot = () => {
    const root = this.rootRef.current;
    const stage = this.stageRef.current;

    const isTall = root.clientWidth / root.clientHeight < this.aspectRatio;

    stage.style.width = isTall ? '100%' : 'auto';
    stage.style.height = isTall ? 'auto' : '100%';
  };
}
