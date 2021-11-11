import './website-navbar.scss';

import React from 'react';
import { Icon } from '@blueprintjs/core';
import { observer } from 'mobx-react';

@observer
export class WebsiteNavbar extends React.Component {
  public render() {
    return (
      <div className={'website-navbar'}>
        <div className={'left-group'}>
          <Icon icon={'book'} size={30} />

          <div>HOME</div>
          <div>LIBRARY</div>
          <div>MY STORIES</div>
        </div>

        <div className={'right-group'}>
          <div>Login</div>
        </div>
      </div>
    );
  }
}
