import './editable-text.scss';

import React from 'react';
import { FormGroup, Intent } from '@blueprintjs/core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { FitTextInput } from '../fit-text-input/FitTextInput';

interface Props {
  text: string;
  onChange: (text: string) => void;
  minLength?: number;
  className?: string;
  label?: string;
  inline?: boolean;
  onBlur?: () => void;
}

@observer
export class EditableText extends React.Component<Props> {
  @observable private isEditing = false;
  @observable private invalid = false;
  private textBeforeEdit = this.props.text;

  public render() {
    const { text, minLength, className, label, inline } = this.props;

    let content: JSX.Element = (
      <div className={'editable-text-content'} onClick={this.onClickText}>
        {text}
      </div>
    );

    if (this.isEditing) {
      content = (
        <FitTextInput
          text={text}
          onChange={this.onTextChange}
          onFocus={this.onFocusInput}
          inputFieldPadding={10}
          onBlur={this.onBlurInput}
          intent={this.invalid ? Intent.DANGER : undefined}
        />
      );
    }

    return (
      <FormGroup
        label={label}
        inline={inline ?? false}
        helperText={this.invalid ? `Must be at least ${minLength} characters` : ''}
      >
        <div className={'editable-text-container ' + className}>{content}</div>
      </FormGroup>
    );
  }

  private onTextChange = (text: string) => {
    const { minLength, onChange } = this.props;

    if (minLength !== undefined) {
      // Is the new text value below the min width?
      this.invalid = text.length < minLength;
    }

    onChange(text);
  };

  private onFocusInput = () => {
    this.textBeforeEdit = this.props.text;
  };

  private onBlurInput = () => {
    const { onChange, onBlur } = this.props;

    if (this.invalid) {
      // If invalid text length, call onChange with pre-edited text content
      onChange(this.textBeforeEdit);
      // Now valid
      this.invalid = false;
    }

    if (onBlur) {
      onBlur();
    }
  };

  @action private onClickText = () => {
    this.isEditing = true;
    document.addEventListener('click', this.onClickDocument);
  };

  @action private onClickDocument = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('#fit-text-input')) {
      this.isEditing = false;
      document.removeEventListener('click', this.onClickDocument);
    }
  };
}
