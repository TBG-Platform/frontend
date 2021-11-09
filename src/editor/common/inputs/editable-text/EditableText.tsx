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
  @observable private showHelp = false;

  public render() {
    const { text, minLength, className, label, inline, onBlur } = this.props;

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
          inputFieldPadding={10}
          onBlur={onBlur}
          intent={this.showHelp ? Intent.DANGER : undefined}
        />
      );
    }

    return (
      <FormGroup
        label={label}
        inline={inline ?? false}
        helperText={this.showHelp ? `Must be at least ${minLength} characters` : ''}
      >
        <div className={'editable-text-container ' + className}>{content}</div>
      </FormGroup>
    );
  }

  private onTextChange = (text: string) => {
    const { minLength, onChange } = this.props;

    if (minLength !== undefined) {
      // Is the new text value below the min width?
      this.showHelp = text.length < minLength;
    }

    onChange(text);
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
