import { observer } from 'mobx-react';
import React from 'react';

import { PageInspectorState } from '../state/PageInspectorState';

import './page-inspector.scss';

interface Props {
  inspectorState: PageInspectorState;
}

@observer
export class PageInspector extends React.Component<Props> {
  public render() {
    return (
      <div className={'page-inspector'}>
        <div className={'inspector-toolbar-area'}></div>
        <div className={'details-area'}></div>
      </div>
    );
  }
}
