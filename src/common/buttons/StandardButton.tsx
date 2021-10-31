import { Button, IconName, Position } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

interface Props {
  icon?: IconName;
  onClick?: () => void;
  text?: string;
  minimal?: boolean;
  outlined?: boolean;
  small?: boolean;
  large?: boolean;
  tooltipText?: string;
  className?: string;
  rightIcon?: IconName;
}

export const StandardButton: React.FC<Props> = observer((props) => {
  return (
    <Tooltip2
      hoverOpenDelay={500}
      position={Position.RIGHT}
      content={props.tooltipText}
      disabled={props.tooltipText === undefined}
      renderTarget={({ isOpen: isTooltipOpen, ref: ref1, ...tooltipProps }) => (
        <Button {...props} {...tooltipProps} elementRef={ref1} />
      )}
    />
  );
});
