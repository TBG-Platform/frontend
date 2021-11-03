import React from 'react';
import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { AddPageDialogState } from '../state/AddPageDialogState';
import { EditorDialogType } from '../../state/EditorDialogTypes';
import { EditorDialogViewState } from '../../state/EditorDialogViewState';

interface Props {
  dialogState: EditorDialogViewState;
  addPage: (name: string) => void;
}

@observer
export class AddPageDialog extends React.Component<Props> {
  @observable private addPageState?: AddPageDialogState;

  public render() {
    const { dialogState } = this.props;

    return (
      <Dialog
        isOpen={dialogState.activeDialog === EditorDialogType.ADD_PAGE}
        onOpening={this.onOpening}
        onClose={this.onClose}
        onClosed={this.onClosed}
        title={'Add page'}
      >
        {this.addPageState && (
          <>
            <div className={Classes.DIALOG_BODY + ' add-page-dialog'}>
              <FormGroup
                label={'Name *'}
                helperText={this.addPageState.isValid ? '' : 'Name must be at least 2 characters'}
              >
                <InputGroup
                  intent={this.addPageState.isValid ? undefined : Intent.DANGER}
                  value={this.addPageState.pageName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.addPageState.setName(e.target.value)
                  }
                />
              </FormGroup>
            </div>

            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button text={'Add'} intent={Intent.PRIMARY} onClick={this.onAddPage} />
              </div>
            </div>
          </>
        )}
      </Dialog>
    );
  }

  private onAddPage = () => {
    // First, validate the input content
    this.addPageState.validate();

    // If still valid, can call add page
    if (this.addPageState.isValid) {
      this.props.addPage(this.addPageState.pageName);
      this.onClose();
    }
  };

  private onOpening = () => {
    // Create the state for the dialog
    this.addPageState = new AddPageDialogState();
  };

  private onClose = () => {
    this.props.dialogState.hideDialog();
  };

  private onClosed = () => {
    // Clear the state for this dialog
    this.addPageState = undefined;
  };
}
