import './page-editor-toolbar.scss';

import React from 'react';
import { Button, ButtonGroup, Intent } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { PageEditorState } from '../state/PageEditorState';
import { PageSelector } from '../../common/components/inputs/page-selector/PageSelector';
import { StandardButton } from '../../common/components/buttons/StandardButton';
import { StandardDivider } from '../../common/components/dividers/StandardDivider';

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
          key={`page-editor-selector-${pageEditorState.pages.length}`}
          pages={pageEditorState.pages}
          onSelect={pageEditorState.setSelectedPage}
          target={
            <Button text={selectedPage.name} minimal outlined small rightIcon={'chevron-down'} />
          }
        />

        <StandardDivider />

        <ButtonGroup minimal>
          <StandardButton
            icon={'widget'}
            text={'Add page item'}
            intent={Intent.PRIMARY}
            minimal
            outlined
            small
            tooltipText={'Add page item'}
            onClick={pageEditorState.toggleAddingPageWidget}
          />
        </ButtonGroup>
      </div>
    );
  }
}
