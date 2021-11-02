import React from 'react';
import { Button, IconName, Position } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';

interface Props {
  icon: IconName;
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

export const StandardButton: React.FC<Props> = observer(
  ({ icon, onClick, text, minimal, outlined, small, large, tooltipText, className, rightIcon }) => {
    return (
      <Tooltip2
        hoverOpenDelay={500}
        position={Position.RIGHT}
        content={tooltipText}
        disabled={tooltipText === undefined}
        renderTarget={({ isOpen: isTooltipOpen, ref: ref1, ...tooltipProps }) => (
          <Button
            className={className}
            icon={icon}
            text={text}
            onClick={onClick}
            minimal={minimal}
            outlined={outlined}
            large={large}
            small={small}
            {...tooltipProps}
            elementRef={ref1}
          />
        )}
      />
    );
  }
);
