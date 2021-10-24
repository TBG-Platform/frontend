import { observer } from 'mobx-react';
import React from 'react';
import { Vector } from '../../../utils/Vector';
import { PageItem } from '../../state/PageItem';

import './page-item-widget.scss';

interface Props {
  pageItem: PageItem;
  selected: boolean;
  onClick: () => void;
  pageDisplayElement: HTMLDivElement;
}

@observer
export class PageItemWidget extends React.Component<Props> {
  private dragOffset = new Vector();

  public render() {
    const { pageItem, selected } = this.props;

    const selectedClass = selected ? 'selected' : 'unselected';
    const classNames = ['page-item-widget', selectedClass];

    return (
      <div
        id={pageItem.id}
        className={classNames.join(' ')}
        onMouseDown={this.onMouseDown}
        style={{ ...pageItem.style }}
      >
        <div className={'page-item-content'}>{pageItem.text}</div>
      </div>
    );
  }

  private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Work out the drag offset; mouse pos relative to item pos
    const item = e.target as HTMLDivElement;
    const itemRect = item.getBoundingClientRect();
    const itemPos = new Vector(itemRect.left, itemRect.top);

    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.sub(itemPos);

    this.dragOffset = mousePos;

    // Setup drag listeners
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  private onMouseMove = (e: MouseEvent) => {
    this.updateItemPos(new Vector(e.clientX, e.clientY));
  };

  private onMouseUp = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    this.props.onClick();
  };

  private updateItemPos(mousePos: Vector) {
    const { pageItem, pageDisplayElement } = this.props;

    // Get mouse pos relative to page pos
    const pageRect = pageDisplayElement.getBoundingClientRect();
    const pagePos = new Vector(pageRect.left, pageRect.top);
    mousePos.sub(pagePos);

    // Adjust by drag offset
    mousePos.sub(this.dragOffset);

    pageItem.setPosition(mousePos);
  }
}
