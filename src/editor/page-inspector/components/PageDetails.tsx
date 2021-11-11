import './page-details.scss';

import React from 'react';
import { observer } from 'mobx-react';

import { DetailsSection } from '../../common/components/dividers/DetailsSection';
import { EditableText } from '../../common/components/inputs/editable-text/EditableText';
import { Page } from '../../common/state/Page';

interface Props {
  page: Page;
}

@observer
export class PageDetails extends React.Component<Props> {
  public render() {
    const { page } = this.props;

    return (
      <div className={'page-details'}>
        <DetailsSection
          title={'Page'}
          content={
            <div className={'page-details-content'}>
              <EditableText
                text={page.name}
                onChange={page.setName}
                onBlur={page.finishSetName}
                label={'Name'}
                inline
                minLength={2}
              />
            </div>
          }
        />
      </div>
    );
  }
}
