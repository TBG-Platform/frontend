import './website-root.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { HomePage } from '../../home-page/components/HomePage';
import { LoginPage } from '../../login-page/components/LoginPage';
import { MyStoriesPage } from '../../my-stories-page/components/MyStoriesPage';
import { WebsiteNavbar } from './WebsiteNavbar';
import { WebsitePage, WebsiteRootState } from '../state/WebsiteRootState';

interface Props {
  websiteState: WebsiteRootState;
}

@observer
export class WebsiteRoot extends React.Component<Props> {
  public render() {
    const { websiteState } = this.props;

    return (
      <div className={'website-root'}>
        <div className={'website-navbar-area'}>
          <WebsiteNavbar websiteState={websiteState} />
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
      case WebsitePage.MY_STORIES:
        if (websiteState.myStoriesState) {
          return <MyStoriesPage myStoriesState={websiteState.myStoriesState} />;
        }
        break;
      case WebsitePage.LOGIN:
        return <LoginPage />;
      default:
        return <div>no page yet!</div>;
    }
  }
}
