import './game-player-dialog.scss';

import React from 'react';
import { Dialog } from '@blueprintjs/core';
import { action, observable } from 'mobx';
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
  @observable private dialogOpened = false;

  public render() {
    const { dialogViewState, gameState } = this.props;

    return (
      <Dialog
        className={'game-player-dialog'}
        isOpen={dialogViewState.activeDialog === EditorDialogType.GAME_PLAYER}
        onClose={this.onClose}
        onOpened={this.onOpened}
      >
        {this.dialogOpened && gameState && <GamePlayerRoot gameState={gameState} />}
      </Dialog>
    );
  }

  @action private onClose = () => {
    this.props.dialogViewState.hideDialog();
    this.dialogOpened = false;
  };

  @action private onOpened = () => {
    this.dialogOpened = true;
  };
}
