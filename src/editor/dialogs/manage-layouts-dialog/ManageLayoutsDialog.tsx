import './manage-layouts-dialog.scss';

import React from 'react';
import { Button, Card, Classes, Dialog, FormGroup } from '@blueprintjs/core';
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
        title={'Manage layouts'}
      >
        <div className={'manage-layouts-dialog ' + Classes.DIALOG_BODY}>
          <FormGroup className={'layouts-list'} label={'Saved layouts'}>
            <Card>
              {editorStorage.userLayouts.map((layout) => (
                <div className={'layout-item'}>
                  {layout.name}
                  <Button className={'actions'} icon={'trash'} minimal outlined small />
                </div>
              ))}
            </Card>
          </FormGroup>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button text={'Close'} onClick={() => dialogViewState.hideDialog()} />
          </div>
        </div>
      </Dialog>
    );
  }
}
