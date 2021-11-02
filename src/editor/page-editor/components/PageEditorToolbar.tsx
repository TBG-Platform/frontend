import './page-editor-toolbar.scss';

import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { PageEditorState } from '../state/PageEditorState';
import { PageSelector } from '../../common/pickers/PageSelector';
import { StandardButton } from '../../common/buttons/StandardButton';
import { StandardDivider } from '../../common/dividers/StandardDivider';

interface Props {
  pageEditorState: PageEditorState;
}

@observer
export class PageEditorToolbar extends React.Component<Props> {
  public render() {
    const { pageEditorState } = this.props;

    const selectedPage = pageEditorState.selectedPage;

    return (
      <div className={'page-editor-toolbar'}>
        <PageSelector
          pages={pageEditorState.pages}
          target={
            <Button text={selectedPage.name} minimal outlined small rightIcon={'chevron-down'} />
          }
        />

        <StandardDivider />

        <ButtonGroup minimal>
          <StandardButton
            icon={'widget'}
            small
            tooltipText={'Add page item'}
            onClick={pageEditorState.toggleAddingPageWidget}
          />
        </ButtonGroup>
      </div>
    );
  }
}
