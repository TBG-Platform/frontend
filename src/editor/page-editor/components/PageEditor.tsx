import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { PageEditorState } from '../state/PageEditorState';
import { PageEditorToolbar } from './PageEditorToolbar';

import './page-editor.scss';

interface Props {
  pageEditorState: PageEditorState;
}

@observer
export class PageEditor extends React.Component<Props> {
  public render() {
    const { pageEditorState } = this.props;

    const selectedPage = pageEditorState.selectedPage;

    return (
      <div className={'page-editor'}>
        <div className={'page-editor-toolbar-area'}>
          <PageEditorToolbar pageEditorState={pageEditorState} />
        </div>
        <div className={'page-edit-area'}>
          <div className={'page-display'}></div>
        </div>
      </div>
    );
  }
}
