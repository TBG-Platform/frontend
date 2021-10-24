import { observer } from 'mobx-react';
import React from 'react';
import { NumberInput, NumberInputSize } from '../../../../common/inputs/number-input/NumberInput';

import { PageItem } from '../../../state/PageItem';

import './page-item-details.scss';

interface Props {
  pageItem: PageItem;
}

@observer
export class PageItemDetails extends React.Component<Props> {
  public render() {
    return <div className={'page-item-details'}>{this.renderTransformSettings()}</div>;
  }

  private renderTransformSettings() {
    const { pageItem } = this.props;

    return (
      <div className={'section transform'}>
        <div className={'section-title'}>Transform</div>
        <div className={'section-content'}>
          <div className={'section-column'}>
            <NumberInput
              label={'W'}
              value={pageItem.width}
              onChange={pageItem.setWidth}
              size={NumberInputSize.MEDIUM}
            />
            <NumberInput
              label={'H'}
              value={pageItem.height}
              onChange={pageItem.setHeight}
              size={NumberInputSize.MEDIUM}
            />
          </div>
          <div className={'section-column'}>
            <NumberInput
              label={'X'}
              value={pageItem.left}
              onChange={pageItem.setLeft}
              size={NumberInputSize.MEDIUM}
            />
            <NumberInput
              label={'Y'}
              value={pageItem.top}
              onChange={pageItem.setTop}
              size={NumberInputSize.MEDIUM}
            />
          </div>
        </div>
      </div>
    );
  }

  private renderContentSettings() {
    const { pageItem } = this.props;

    return <div className={'section content'}></div>;
  }
}
