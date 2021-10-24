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
  private dragging = false;

  public render() {
    const { pageItem, selected, onClick } = this.props;

    const selectedClass = selected ? 'selected' : 'unselected';
    const classNames = ['page-item-widget', selectedClass];

    return (
      <div
        id={pageItem.id}
        className={classNames.join(' ')}
        //onDragStart={this.onDragStart}
        // onDrag={this.onDrag}
        // onDragEnd={this.onDragEnd}
        //draggable={'true'}
        onMouseDown={this.onMouseDown}
        style={{ ...pageItem.style }}
      >
        {pageItem.text}
      </div>
    );
  }

  private onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Work out the drag offset; mouse pos relative to item pos
    const item = e.target as HTMLDivElement;
    const itemRect = item.getBoundingClientRect();
    const itemPos = new Vector(itemRect.left, itemRect.top);

    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.print('mousePos: ');
    mousePos.sub(itemPos);

    this.dragOffset = mousePos;

    // Setup drag listeners
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  public onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('drag start');

    // Hide the default drag ghost image
    const dragImage = document.createElement('div');
    dragImage.style.visibility = 'hidden';
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    // Work out the drag offset; mouse pos relative to item pos
    const item = e.target as HTMLDivElement;
    const itemRect = item.getBoundingClientRect();
    const itemPos = new Vector(itemRect.left, itemRect.top);

    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.print('mousePos: ');
    mousePos.sub(itemPos);

    this.dragOffset = mousePos;
    this.updateItemPos(new Vector(e.clientX, e.clientY));
  };

  public onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.print('drag mousePos: ');
    this.updateItemPos(mousePos);
  };

  public onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('drag end');
    // Set position one last time (ends up at 0,0 otherwise)
    this.updateItemPos(new Vector(e.clientX, e.clientY));
  };

  private onMouseMove = (e: MouseEvent) => {
    this.updateItemPos(new Vector(e.clientX, e.clientY));
  };

  private onMouseUp = (e: MouseEvent) => {
    this.updateItemPos(new Vector(e.clientX, e.clientY));
    this.props.onClick();

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
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
