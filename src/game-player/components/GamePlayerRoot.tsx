import React from 'react';
import { observer } from 'mobx-react';

import { GamePlayerRootState } from '../state/GamePlayerRootState';

interface Props {
  gameState: GamePlayerRootState;
}

@observer
export class GamePlayerRoot extends React.Component<Props> {
  public render() {
    const { gameState } = this.props;

    console.log('game rendering', gameState);

    return <div>player</div>;
  }
}
