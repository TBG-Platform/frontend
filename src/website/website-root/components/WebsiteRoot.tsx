import './website-root.scss';

import React from 'react';
import { observer } from 'mobx-react';

@observer
export class WebsiteRoot extends React.Component {
  public render() {
    return (
      <div className={'website-root'}>
        <div className={'website-navbar-area'}></div>
        <div className={'website-page-area'}></div>
      </div>
    );
  }
}
