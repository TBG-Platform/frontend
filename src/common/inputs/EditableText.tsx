import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { FitTextInput } from './FitTextInput';

import './editable-text.scss';

interface Props {
  text: string;
  onChange: (text: string) => void;
  className?: string;
  label?: string;
}

@observer
export class EditableText extends React.Component<Props> {
  @observable private isEditing = false;

  public render() {
    const { text, onChange, className, label } = this.props;

    let content: JSX.Element = (
      <div className={'editable-text-content'} onClick={this.onClickText}>
        {text}
      </div>
    );

    if (this.isEditing) {
      content = <FitTextInput text={text} onChange={onChange} inputFieldPadding={10} />;
    }

    return (
      <div className={'editable-text-container ' + className}>
        {label && <span className={'editable-text-label'}>{label}</span>}
        {content}
      </div>
    );
  }

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
