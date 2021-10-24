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
  private pageItemRef = React.createRef<HTMLDivElement>();
  private dragOffset = new Vector();

  public render() {
    const { pageItem, selected } = this.props;

    const selectedClass = selected ? 'selected' : 'unselected';
    const classNames = ['page-item-widget', selectedClass];

    return (
      <div
        ref={this.pageItemRef}
        id={pageItem.id}
        className={classNames.join(' ')}
        draggable={'false'}
        onMouseDown={this.onItemMouseDown}
        style={{ ...pageItem.settings }}
      >
        <div className={'page-item-content'} draggable={'false'}>
          <div className={'page-item-text'} style={{ ...pageItem.textSettings.settings }}>
            {pageItem.textSettings.text}
          </div>

          <div className={'resize-handle'} onMouseDown={this.onResizeMouseDown}></div>
        </div>
      </div>
    );
  }

  private onItemMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Work out the drag offset; mouse pos relative to item pos
    const itemRect = this.pageItemRef.current.getBoundingClientRect();
    const itemPos = new Vector(itemRect.left, itemRect.top);

    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.sub(itemPos);

    this.dragOffset = mousePos;

    // Setup drag listeners
    document.addEventListener('mousemove', this.onDragItem);
    document.addEventListener('mouseup', this.onDragEnd);
  };

  private onDragItem = (e: MouseEvent) => {
    this.updateItemPos(new Vector(e.clientX, e.clientY));
  };

  private onDragEnd = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', this.onDragItem);
    document.removeEventListener('mouseup', this.onDragEnd);

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

  private onResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // Setup resize listeners
    document.addEventListener('mousemove', this.onResize);
    document.addEventListener('mouseup', this.onResizeEnd);
  };

  private onResize = (e: MouseEvent) => {
    const { pageItem } = this.props;

    // Mouse pos - item left is new width
    const itemRect = this.pageItemRef.current.getBoundingClientRect();
    const itemPos = new Vector(itemRect.x, itemRect.y);

    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.sub(itemPos);

    pageItem.setWidth(mousePos.x);
    pageItem.setHeight(mousePos.y);
  };

  private onResizeEnd = () => {
    // Remove listeners
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.onResizeEnd);
  };
}
