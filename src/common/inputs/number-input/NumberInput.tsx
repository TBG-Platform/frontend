import { NumericInput } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import './number-input.scss';

export enum NumberInputSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  FILL = 'fill',
}

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  id?: string;
  size?: NumberInputSize;
  onBlur?: (value: number) => void;
}

@observer
export class NumberInput extends React.Component<Props> {
  public render() {
    const { label, value, onChange, id, size, onBlur } = this.props;

    const inputSize = size ?? NumberInputSize.FILL;

    return (
      <div className={'number-input ' + inputSize}>
        {label}
        <NumericInput
          id={id}
          buttonPosition={'none'}
          min={undefined}
          max={undefined}
          minorStepSize={0.001}
          majorStepSize={0.1}
          stepSize={0.01}
          value={value}
          onValueChange={this.onChange}
          onBlur={
            onBlur
              ? (e: React.ChangeEvent<HTMLInputElement>) => onBlur(parseInt(e.target.value, 10))
              : undefined
          }
        />
      </div>
    );
  }

  private onChange = (val: number) => {
    if (!isNaN(val)) {
      this.props.onChange(val);
    }
  };
}
