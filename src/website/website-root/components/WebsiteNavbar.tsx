import './website-navbar.scss';

import React from 'react';
import { Icon, Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';

@observer
export class WebsiteNavbar extends React.Component {
  public render() {
    return (
      <div className={'website-navbar'}>
        <div className={'left-group'}>
          <Icon icon={'book'} size={30} />

          {this.renderNavbarPageLink('Home')}
          {this.renderNavbarPageLink('Library')}
          {this.renderNavbarPageLink('My Stories')}
        </div>

        <div className={'right-group'}>
          <div>Login</div>
        </div>
      </div>
    );
  }

  private renderNavbarPageLink(name: string) {
    return (
      <div className={'page-link'}>
        <Text>{name}</Text>
      </div>
    );
  }
}
