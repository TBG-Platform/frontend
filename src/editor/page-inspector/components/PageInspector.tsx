import './page-inspector.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { PageDetails } from './PageDetails';
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

    return (
      <div className={'page-inspector'}>
        <div className={'inspector-toolbar-area'}>
          <PageInspectorToolbar inspectorState={inspectorState} />
        </div>
        <div className={'details-area'}>
          <div className={'sub-details-area'}>
            <PageDetails page={selectedPage} />
          </div>
          <div className={'sub-details-area'}>
            <PageItemDetails
              pageItem={selectedPage.selectedItem}
              linkablePages={inspectorState.getLinkablePages()}
              onLinkPage={inspectorState.onLinkPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
