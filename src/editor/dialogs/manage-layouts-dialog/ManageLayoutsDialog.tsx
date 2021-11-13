import './manage-layouts-dialog.scss';

import React from 'react';
import { Button, Card, Classes, Dialog, FormGroup, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { EditorDialogType, EditorDialogViewState } from '../state/EditorDialogViewState';
import { EditorRootStorage } from '../../editor-root/state/EditorRootStorage';

interface Props {
  dialogViewState: EditorDialogViewState;
  editorStorage: EditorRootStorage;
}

@observer
export class ManageLayoutsDialog extends React.Component<Props> {
  public render() {
    const { dialogViewState, editorStorage } = this.props;

    return (
      <Dialog
        isOpen={dialogViewState.activeDialog === EditorDialogType.MANAGE_LAYOUTS}
        onClose={this.onClose}
        title={'Manage layouts'}
      >
        <div className={'manage-layouts-dialog ' + Classes.DIALOG_BODY}>
          <FormGroup className={'layouts-list'} label={'Saved layouts'}>
            <Card>{this.renderLayouts()}</Card>
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button text={'Close'} onClick={this.onClose} />
          </div>
        </div>
      </Dialog>
    );
  }

  private onClose = () => {
    this.props.dialogViewState.hideDialog();
  };

  private renderLayouts() {
    const { editorStorage } = this.props;

    if (!editorStorage.userLayouts.length) {
      return (
        <NonIdealState
          icon={'clean'}
          title={'No saved layouts'}
          description={'You have no saved layouts!'}
        />
      );
    }

    return editorStorage.userLayouts.map((layout) => (
      <div className={'layout-item'}>
        {layout.name}
        <Button
          className={'actions'}
          icon={'trash'}
          minimal
          outlined
          small
          onClick={() => editorStorage.deleteLayout(layout.id)}
        />
      </div>
    ));
  }
}
