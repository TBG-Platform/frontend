import './details-section.scss';

import React from 'react';
import { Collapse, Icon } from '@blueprintjs/core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

interface Props {
  title: string;
  content: JSX.Element;
}

@observer
export class DetailsSection extends React.Component<Props> {
  @observable isOpen = false;

  public render() {
    const { title, content } = this.props;

    return (
      <div className={'details-section'}>
        <div className={'details-section-title'} onClick={this.onClickTitle}>
          <Icon icon={this.isOpen ? 'chevron-down' : 'chevron-right'} />
          {title}
        </div>
        <Collapse isOpen={this.isOpen}>
          <div className={'details-section-content'}>{content}</div>
        </Collapse>
      </div>
    );
  }

  @action private onClickTitle = () => {
    this.isOpen = !this.isOpen;
  };
}
