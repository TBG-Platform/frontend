import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { PageSelector } from '../../editor-root/components/navbar/PageSelector';
import { Page } from '../../state/Page';
import { PageEditorState } from '../state/PageEditorState';

import './page-editor.scss';

interface Props {
  pageEditorState: PageEditorState;
}

@observer
export class PageEditor extends React.Component<Props> {
  public render() {
    const { pageEditorState } = this.props;

    const selectedPageName = pageEditorState.selectedPage.name;

    return (
      <div className={'page-editor'}>
        <div className={'page-editor-toolbar'}>
          <PageSelector
            pages={pageEditorState.pages}
            target={<Button text={selectedPageName} small rightIcon={'chevron-down'} />}
          />
        </div>
        <div className={'page-edit-area'}>
          <div className={'page-display'}></div>
        </div>
      </div>
    );
  }
}
