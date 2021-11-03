import './add-page-dialog.scss';

import React from 'react';
import { Dialog } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { EditorDialogType } from '../state/EditorDialogTypes';
import { EditorDialogViewState } from '../state/EditorDialogViewState';

interface Props {
  dialogState: EditorDialogViewState;
}

@observer
export class AddPageDialog extends React.Component<Props> {
  public render() {
    const { dialogState } = this.props;

    return (
      <Dialog
        isOpen={dialogState.activeDialog === EditorDialogType.ADD_PAGE}
        onClose={dialogState.hideDialog}
      >
        <div>i am a dialog</div>
      </Dialog>
    );
  }
}
