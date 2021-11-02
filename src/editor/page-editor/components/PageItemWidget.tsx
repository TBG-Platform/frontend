import 'mobx-react-lite/batchingForReactDom';

import './page-item-widget.scss';

import React from 'react';
import { ContextMenu2 } from '@blueprintjs/popover2';
import { Menu, MenuItem } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { PageItem } from '../../common/state/PageItem';
import { Vector } from '../../../utils/Vector';

interface Props {
  pageDiv: HTMLDivElement;
  pageItem: PageItem;
  selected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

@observer
export class PageItemWidget extends React.Component<Props> {
  private pageItemRef = React.createRef<HTMLDivElement>();
  private dragOffset = new Vector();
  private pageResizeObserver: ResizeObserver;
  @observable private pageWidth = 0;

  constructor(props: Props) {
    super(props);

    // Setup page width
    this.pageWidth = props.pageDiv.getBoundingClientRect().width;
  }

  componentDidMount() {
    const { pageDiv } = this.props;

    this.pageResizeObserver = new ResizeObserver((_entries: ResizeObserverEntry[]) => {
      this.pageWidth = pageDiv.getBoundingClientRect().width;
    });

    this.pageResizeObserver.observe(pageDiv);
  }

  public render() {
    const { pageItem, selected, onDelete } = this.props;

    const selectedClass = selected ? 'selected' : 'unselected';
    const classNames = ['page-item-widget', selectedClass];

    return (
      <WidgetContextMenu onDelete={onDelete}>
        <div
          ref={this.pageItemRef}
          id={pageItem.id}
          className={classNames.join(' ')}
          draggable={'false'}
          onMouseDown={this.onItemMouseDown}
          style={{ ...pageItem.settings }}
        >
          <div className={'page-item-content'} draggable={'false'}>
            <div
              className={'page-item-text'}
              style={{ ...pageItem.textSettings.settings, fontSize: this.getFontSize() }}
            >
              {pageItem.textSettings.text}
            </div>

            <div className={'resize-handle'} onMouseDown={this.onResizeMouseDown}></div>
          </div>
        </div>
      </WidgetContextMenu>
    );
  }

  private getFontSize() {
    const { pageDiv, pageItem } = this.props;

    // Page item 'size' prop is percentage of page width
    //    const pageRect = pageDiv.getBoundingClientRect();
    const w = this.pageWidth;
    const s = parseFloat(pageItem.textSettings.size);

    const fontSize = (w / 100) * s;

    return fontSize + 'px';
  }

  private onItemMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Work out the drag offset; mouse pos relative to item pos
    const itemRect = this.pageItemRef.current.getBoundingClientRect();
    const itemPos = new Vector(itemRect.left, itemRect.top);

    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.sub(itemPos);

    this.dragOffset = mousePos;

    // Setup drag listeners
    document.addEventListener('mouseup', this.onDragEnd);
    document.addEventListener('mousemove', this.onDragItem);
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
    const { pageDiv, pageItem } = this.props;

    // Get mouse pos relative to page pos
    const pageRect = pageDiv.getBoundingClientRect();
    const pagePos = new Vector(pageRect.left, pageRect.top);
    mousePos.sub(pagePos);

    // Adjust by drag offset
    mousePos.sub(this.dragOffset);

    // Get position as percentage values
    const leftPercent = (mousePos.x / pageRect.width) * 100;
    const topPercent = (mousePos.y / pageRect.height) * 100;

    pageItem.setLeft(leftPercent.toFixed(3));
    pageItem.setTop(topPercent.toFixed(3));
  }

  private onResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // Setup resize listeners
    document.addEventListener('mouseup', this.onResizeEnd);
    document.addEventListener('mousemove', this.onResize);
  };

  private onResize = (e: MouseEvent) => {
    const { pageDiv, pageItem } = this.props;

    // Mouse pos - item left is new width
    const itemRect = this.pageItemRef.current.getBoundingClientRect();
    const itemPos = new Vector(itemRect.x, itemRect.y);

    const mousePos = new Vector(e.clientX, e.clientY);
    mousePos.sub(itemPos);

    // Get size as percentage
    const pageRect = pageDiv.getBoundingClientRect();
    const widthPercent = (mousePos.x / pageRect.width) * 100;
    const heightPercent = (mousePos.y / pageRect.height) * 100;

    pageItem.setWidth(widthPercent.toFixed(3));
    pageItem.setHeight(heightPercent.toFixed(3));
  };

  private onResizeEnd = () => {
    // Remove listeners
    document.removeEventListener('mousemove', this.onResize);
    document.removeEventListener('mouseup', this.onResizeEnd);
  };
}

interface WidgetContextMenuProps {
  onDelete: () => void;
}

const WidgetContextMenu: React.FC<WidgetContextMenuProps> = ({ onDelete, children }) => {
  return (
    <ContextMenu2
      content={
        <Menu>
          <MenuItem icon={'trash'} text={'Delete'} onClick={onDelete} />
        </Menu>
      }
    >
      {children}
    </ContextMenu2>
  );
};
