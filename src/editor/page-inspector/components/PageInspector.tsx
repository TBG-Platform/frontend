import './page-inspector.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { PageInspectorState } from '../state/PageInspectorState';
import { PageInspectorToolbar } from './PageInspectorToolbar';
import { PageItemDetails } from './PageItemDetails';

interface Props {
  inspectorState: PageInspectorState;
}

@observer
export class PageInspector extends React.Component<Props> {
  public render() {
    const { inspectorState } = this.props;

    const selectedPage = inspectorState.selectedPage;

    console.log('pageInspector render');

    return (
      <div className={'page-inspector'}>
        <div className={'inspector-toolbar-area'}>
          <PageInspectorToolbar inspectorState={inspectorState} />
        </div>
        <div className={'details-area'}>
          <PageItemDetails pageItem={selectedPage.selectedItem} />
        </div>
      </div>
    );
  }
}
