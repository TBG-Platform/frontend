import { Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';
import { ColorResult, SketchPicker } from 'react-color';

import './color-picker.scss';

interface Props {
  label?: string;
  color: string;
  setColor: (color: ColorResult) => void;
}

@observer
export class ColorPicker extends React.Component<Props> {
  public render() {
    const { label, color, setColor } = this.props;

    return (
      <div className={'color-picker'}>
        {label && <span className={'label'}>{label}</span>}
        <Popover2 content={<SketchPicker color={color} onChange={setColor} />}>
          <Button outlined style={{ backgroundColor: color }} />
        </Popover2>
      </div>
    );
  }
}
