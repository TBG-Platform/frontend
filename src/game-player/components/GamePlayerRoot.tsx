import './game-player-root.scss';

import React from 'react';
import { Button, Card, Navbar, Text } from '@blueprintjs/core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { GamePage } from '../state/GamePage';
import { GamePageItemWidget } from './GamePageItemWidget';
import { GamePlayerRootState } from '../state/GamePlayerRootState';
import { PageSelector } from '../../editor/common/components/inputs/page-selector/PageSelector';

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
        {this.renderDebugControls()}
        <div ref={this.stageRef} className={'game-stage'}>
          {this.stageWidth !== 0 && this.renderCurrentPage()}
        </div>
      </div>
    );
  }

  private renderDebugControls() {
    const { gameState } = this.props;

    if (!gameState.debugMode) {
      return undefined;
    }

    return (
      <div className={'debug-controls'}>
        <Card className={'debug-content'} elevation={2}>
          <PageSelector
            key={`game-page-selector`}
            pages={gameState.story.pages}
            onSelect={(page: GamePage) => gameState.setPage(page.id)}
            target={
              <Button
                text={gameState.currentPage.name}
                minimal
                outlined
                rightIcon={'chevron-down'}
              />
            }
          />
        </Card>
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
