import './fit-text-input.scss';

import React from 'react';
import { InputGroup, Intent } from '@blueprintjs/core';
import { observer } from 'mobx-react';

interface Props {
  text: string;
  onChange: (text: string) => void;
  onFocus?: () => void;
  inputFieldPadding: number;
  onBlur?: () => void;
  intent?: Intent;
}

@observer
export class FitTextInput extends React.Component<Props> {
  private nameInputRef = React.createRef<HTMLInputElement>();
  private hiddenNameRef = React.createRef<HTMLSpanElement>();

  componentDidMount() {
    this.resizeInput();
  }

  public render() {
    const { text, onFocus, onBlur, intent } = this.props;

    return (
      <div className={'fit-text-input'}>
        <span ref={this.hiddenNameRef} className={'hidden-name'}>
          {text}
        </span>
        <InputGroup
          id={'fit-text-input'}
          inputRef={this.nameInputRef}
          autoFocus
          autoComplete={'off'}
          value={text}
          onChange={this.onInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          intent={intent}
        />
      </div>
    );
  }

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // On change prop callback first
    this.props.onChange(e.target.value);

    // Then update hidden text with value
    this.hiddenNameRef.current.textContent = e.target.value;

    // Then resize input
    this.resizeInput();
  };

  private resizeInput = () => {
    const { inputFieldPadding } = this.props;

    if (this.hiddenNameRef.current && this.nameInputRef.current) {
      const width = this.hiddenNameRef.current.offsetWidth + inputFieldPadding * 2 + 'px';
      this.nameInputRef.current.style.width = width;
    }
  };
}
