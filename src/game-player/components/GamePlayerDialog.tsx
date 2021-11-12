import React from 'react';
import { Classes, Dialog } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import {
  EditorDialogType,
  EditorDialogViewState,
} from '../../editor/dialogs/state/EditorDialogViewState';
import { GamePlayerRoot } from './GamePlayerRoot';

interface Props {
  dialogViewState: EditorDialogViewState;
}

@observer
export class GamePlayerDialog extends React.Component<Props> {
  public render() {
    const { dialogViewState } = this.props;

    return (
      <Dialog
        isOpen={dialogViewState.activeDialog === EditorDialogType.GAME_PLAYER}
        onClose={this.onClose}
      >
        <div className={'game-player-dialog ' + Classes.DIALOG_BODY}>
          <GamePlayerRoot />
        </div>
      </Dialog>
    );
  }

  private onClose = () => {
    this.props.dialogViewState.hideDialog();
  };
}
