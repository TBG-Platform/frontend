import './website-root.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { HomePage } from '../../home-page/components/HomePage';
import { WebsiteNavbar } from './WebsiteNavbar';
import { WebsitePage, WebsiteRootState } from '../state/WebsiteRootState';

interface Props {
  websiteState: WebsiteRootState;
}

@observer
export class WebsiteRoot extends React.Component<Props> {
  public render() {
    return (
      <div className={'website-root'}>
        <div className={'website-navbar-area'}>
          <WebsiteNavbar />
        </div>
        <div className={'website-page-area'}>{this.getWebsitePage()}</div>
      </div>
    );
  }

  private getWebsitePage() {
    const { websiteState } = this.props;

    switch (websiteState.page) {
      case WebsitePage.HOME:
        return <HomePage />;
    }
  }
}
