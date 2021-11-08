import './page-inspector-toolbar.scss';

import React from 'react';
import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { PageInspectorState } from '../state/PageInspectorState';
import { PageSelector } from '../../common/inputs/page-selector/PageSelector';

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
          key={`page-inspector-selector-${inspectorState.pages.length}`}
          pages={inspectorState.pages}
          onSelect={inspectorState.setSelectedPage}
          target={
            <Button text={selectedPage.name} minimal outlined small rightIcon={'chevron-down'} />
          }
        />
      </div>
    );
  }
}
