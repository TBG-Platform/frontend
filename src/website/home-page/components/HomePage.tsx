import './home-page.scss';

import React from 'react';
import { observer } from 'mobx-react';

@observer
export class HomePage extends React.Component {
  public render() {
    return <div className={'home-page'}></div>;
  }
}
