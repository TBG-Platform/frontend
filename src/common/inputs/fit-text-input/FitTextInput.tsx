import { InputGroup } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import './fit-text-input.scss';

interface Props {
  text: string;
  onChange: (text: string) => void;
  inputFieldPadding: number;
}

@observer
export class FitTextInput extends React.Component<Props> {
  private nameInputRef = React.createRef<HTMLInputElement>();
  private hiddenNameRef = React.createRef<HTMLSpanElement>();

  componentDidMount() {
    this.resizeInput();
  }

  public render() {
    const { text } = this.props;

    return (
      <div className={'fit-text-input'}>
        <span ref={this.hiddenNameRef} className={'hidden-name'}>
          {text}
        </span>
        <InputGroup
          id={'fit-text-input'}
          inputRef={this.nameInputRef}
          autoFocus
          value={text}
          onChange={this.onInputChange}
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