import { observer } from 'mobx-react';
import React from 'react';
import { PageItem } from '../../state/PageItem';

import './page-item-widget.scss';

interface Props {
  pageItem: PageItem;
  selected: boolean;
  onClick: () => void;
}

@observer
export class PageItemWidget extends React.Component<Props> {
  public render() {
    const { pageItem, selected, onClick } = this.props;

    const selectedClass = selected ? 'selected' : 'unselected';
    const classNames = ['page-item-widget', selectedClass];

    return (
      <div className={classNames.join(' ')} onClick={onClick} style={{ ...pageItem.style }}>
        {pageItem.text}
      </div>
    );
  }
}
