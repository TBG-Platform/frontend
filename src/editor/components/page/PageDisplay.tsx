import { observer } from 'mobx-react';
import React from 'react';
import { Page } from '../../state/Page';

import './page-display.scss';

interface Props {
  page: Page;
}

@observer
export class PageDisplay extends React.Component<Props> {
  public render() {
    return <div className={'page-display'}></div>;
  }
}
