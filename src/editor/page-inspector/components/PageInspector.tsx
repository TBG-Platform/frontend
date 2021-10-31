import { observer } from 'mobx-react';
import React from 'react';

import { PageInspectorState } from '../state/PageInspectorState';
import { PageInspectorToolbar } from './PageInspectorToolbar';

import './page-inspector.scss';

interface Props {
  inspectorState: PageInspectorState;
}

@observer
export class PageInspector extends React.Component<Props> {
  public render() {
    const { inspectorState } = this.props;

    return (
      <div className={'page-inspector'}>
        <div className={'inspector-toolbar-area'}>
          <PageInspectorToolbar inspectorState={inspectorState} />
        </div>
        <div className={'details-area'}></div>
      </div>
    );
  }
}
