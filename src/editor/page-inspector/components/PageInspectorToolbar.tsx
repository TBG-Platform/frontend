import './page-inspector-toolbar.scss';

import React from 'react';
import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { PageInspectorState } from '../state/PageInspectorState';
import { PageSelector } from '../../common/pickers/PageSelector';

interface Props {
  inspectorState: PageInspectorState;
}

@observer
export class PageInspectorToolbar extends React.Component<Props> {
  public render() {
    const { inspectorState } = this.props;

    const selectedPage = inspectorState.selectedPage;

    return (
      <div className={'page-inspector-toolbar'}>
        <PageSelector
          pages={inspectorState.pages}
          target={
            <Button text={selectedPage.name} minimal outlined small rightIcon={'chevron-down'} />
          }
        />
      </div>
    );
  }
}
