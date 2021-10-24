import { observer } from 'mobx-react';
import React from 'react';

import { PageItem } from '../../../state/PageItem';

import './page-item-details.scss';

interface Props {
  pageItem: PageItem;
}

@observer
export class PageItemDetails extends React.Component<Props> {
  public render() {
    const { pageItem } = this.props;

    return <div className={'page-item-details'}>page item</div>;
  }
}
