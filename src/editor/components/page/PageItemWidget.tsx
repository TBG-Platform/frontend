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
  public render() {
    const { pageItem, selected, onClick } = this.props;

    const selectedClass = selected ? 'selected' : 'unselected';
    const classNames = ['page-item-widget', selectedClass];

    return (
      <div
        id={pageItem.id}
        className={classNames.join(' ')}
        onDragStart={this.onDragStart}
        onDrag={this.onDrag}
        onDragEnd={this.onDragEnd}
        draggable={'true'}
        onClick={onClick}
        style={{ ...pageItem.style }}
      >
        {pageItem.text}
      </div>
    );
  }

  public onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('drag start');

    // Hide the default drag ghost image
    const dragImage = document.createElement('div');
    dragImage.style.visibility = 'hidden';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  public onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const { pageItem, pageDisplayElement } = this.props;

    // Update item's position with mouse
    const mousePos = new Vector(e.clientX, e.clientY);
    const pageRect = pageDisplayElement.getBoundingClientRect();
    const pagePos = new Vector(pageRect.left, pageRect.top);
    mousePos.sub(pagePos);
    pageItem.setPosition(mousePos);
  };

  public onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const { pageItem, pageDisplayElement } = this.props;

    console.log('drag end');

    // Set position one last time (ends up at 0,0 otherwise)
    const mousePos = new Vector(e.clientX, e.clientY);
    const pageRect = pageDisplayElement.getBoundingClientRect();
    const pagePos = new Vector(pageRect.left, pageRect.top);
    mousePos.sub(pagePos);
    pageItem.setPosition(mousePos);
  };
}
