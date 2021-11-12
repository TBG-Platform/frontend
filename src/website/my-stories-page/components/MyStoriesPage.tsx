import './my-stories-page.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { MyStoriesPageState } from '../state/MyStoriesPageState';

interface Props {
  myStoriesState: MyStoriesPageState;
}

@observer
export class MyStoriesPage extends React.Component<Props> {
  public render() {
    return (
      <div className={'my-stories-page'}>
        <div className={'section'}>
          <div className={'section-heading'}>Drafts</div>
          <div className={'section-list'}></div>
        </div>

        <div className={'section'}>
          <div className={'section-heading'}>Published</div>
          <div className={'section-list'}></div>
        </div>
      </div>
    );
  }
}
