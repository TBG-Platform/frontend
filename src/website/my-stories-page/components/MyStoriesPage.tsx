import './my-stories-page.scss';

import React from 'react';
import { observer } from 'mobx-react';

@observer
export class MyStoriesPage extends React.Component {
  public render() {
    return (
      <div className={'my-stories-page'}>
        <div>Drafts</div>

        <div>Published</div>
      </div>
    );
  }
}
