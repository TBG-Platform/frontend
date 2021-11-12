import './website-navbar.scss';

import React from 'react';
import { Icon, Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { WebsitePage, WebsiteRootState } from '../state/WebsiteRootState';

interface Props {
  websiteState: WebsiteRootState;
}

@observer
export class WebsiteNavbar extends React.Component<Props> {
  public render() {
    return (
      <div className={'website-navbar'}>
        <div className={'left-group'}>
          <Icon icon={'book'} size={30} />

          {this.renderNavbarPageLink(WebsitePage.HOME)}
          {this.renderNavbarPageLink(WebsitePage.LIBRARY)}
          {this.renderNavbarPageLink(WebsitePage.MY_STORIES)}
        </div>

        <div className={'right-group'}>{this.renderNavbarPageLink(WebsitePage.LOGIN)}</div>
      </div>
    );
  }

  private renderNavbarPageLink(page: WebsitePage) {
    const { websiteState } = this.props;

    const active = websiteState.page === page ? 'active' : 'inactive';

    return (
      <div className={'page-link ' + active} onClick={() => websiteState.toPage(page)}>
        <Text>{this.getPageName(page)}</Text>
      </div>
    );
  }

  private getPageName(page: WebsitePage) {
    switch (page) {
      case WebsitePage.HOME:
        return 'Home';
      case WebsitePage.LIBRARY:
        return 'Library';
      case WebsitePage.MY_STORIES:
        return 'My Stories';
      case WebsitePage.LOGIN:
        return 'Login';
    }
  }
}
