import { observer } from 'mobx-react';
import React from 'react';

import './page-editor.scss';

@observer
export class PageEditor extends React.Component {
  public render() {
    return (
      <div className={'page-editor'}>
        <div className={'page-editor-toolbar'}></div>
        <div className={'page-edit-area'}>
          <div className={'page-display'}></div>
        </div>
      </div>
    );
  }
}
