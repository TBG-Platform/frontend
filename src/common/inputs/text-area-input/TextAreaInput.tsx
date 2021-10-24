import { Text, TextArea } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import './text-area-input.scss';

interface Props {
  label: string;
  text: string;
  onChange: (text: string) => void;
}

@observer
export class TextAreaInput extends React.Component<Props> {
  public render() {
    const { label, text, onChange } = this.props;

    return (
      <div className={'text-area-input'}>
        <Text>{label}</Text>
        <TextArea
          growVertically
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        />
      </div>
    );
  }
}
