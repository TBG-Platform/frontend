import { observer } from 'mobx-react';
import React from 'react';

import './page-navbar.scss';

@observer
export class PageNavbar extends React.Component {
  public render() {
    return <div className={'page-navbar'}></div>;
  }
}
