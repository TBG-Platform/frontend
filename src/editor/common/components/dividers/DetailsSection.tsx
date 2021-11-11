import './details-section.scss';

import React from 'react';

interface Props {
  title: string;
  content: JSX.Element;
}

export class DetailsSection extends React.Component<Props> {
  public render() {
    const { title, content } = this.props;

    return (
      <div className={'details-section'}>
        <div className={'details-section-title'}>{title}</div>
        <div className={'details-section-content'}>{content}</div>
      </div>
    );
  }
}
