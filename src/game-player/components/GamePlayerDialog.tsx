import './game-player-dialog.scss';

import React from 'react';
import { Dialog } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import {
  EditorDialogType,
  EditorDialogViewState,
} from '../../editor/dialogs/state/EditorDialogViewState';
import { GamePlayerRoot } from './GamePlayerRoot';
import { GamePlayerRootState } from '../state/GamePlayerRootState';

interface Props {
  dialogViewState: EditorDialogViewState;
  gameState?: GamePlayerRootState;
}

@observer
export class GamePlayerDialog extends React.Component<Props> {
  public render() {
    const { dialogViewState, gameState } = this.props;

    return (
      <Dialog
        className={'game-player-dialog'}
        isOpen={dialogViewState.activeDialog === EditorDialogType.GAME_PLAYER}
        onClose={this.onClose}
      >
        {gameState && <GamePlayerRoot gameState={gameState} />}
      </Dialog>
    );
  }

  private onClose = () => {
    this.props.dialogViewState.hideDialog();
  };
}
