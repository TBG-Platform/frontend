import './add-page-dialog.scss';

import React from 'react';
import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { AddPageDialogState } from '../state/AddPageDialogState';
import { EditorDialogType } from '../../state/EditorDialogTypes';
import { EditorDialogViewState } from '../../state/EditorDialogViewState';

interface Props {
  dialogState: EditorDialogViewState;
}

@observer
export class AddPageDialog extends React.Component<Props> {
  private addPageState = new AddPageDialogState();

  public render() {
    const { dialogState } = this.props;

    return (
      <Dialog
        isOpen={dialogState.activeDialog === EditorDialogType.ADD_PAGE}
        onClose={dialogState.hideDialog}
        title={'Add page'}
      >
        <div className={Classes.DIALOG_BODY + ' add-page-dialog'}>
          <FormGroup label={'Name'}>
            <InputGroup
              value={this.addPageState.pageName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.addPageState.setName(e.target.value)
              }
            />
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button text={'Add'} intent={Intent.PRIMARY} />
          </div>
        </div>
      </Dialog>
    );
  }
}
