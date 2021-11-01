import { observer } from 'mobx-react';
import React from 'react';

import { PageInspectorState } from '../state/PageInspectorState';
import { PageInspectorToolbar } from './PageInspectorToolbar';
import { PageItemDetails } from '../../components/details-panel/page-item-details/PageItemDetails';

import './page-inspector.scss';

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
