import './page-editor.scss';

import React from 'react';
import { ContextMenu2 } from '@blueprintjs/popover2';
import { Menu, MenuItem } from '@blueprintjs/core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { PageEditorState } from '../state/PageEditorState';
import { PageEditorToolbar } from './PageEditorToolbar';
import { PageItemWidget } from './PageItemWidget';
import { Vector } from '../../../utils/Vector';

interface Props {
  pageEditorState: PageEditorState;
  playFromHere: (pageId: string) => void;
}

@observer
export class PageEditor extends React.Component<Props> {
  private pageRef = React.createRef<HTMLDivElement>();
  private pageResizeObserver: ResizeObserver;
  @observable private pageRect: DOMRect;

  componentDidMount() {
    if (this.pageRef.current) {
      this.props.pageEditorState.setPageDiv(this.pageRef.current);
      this.pageRect = this.pageRef.current.getBoundingClientRect();
    }

    this.pageResizeObserver = new ResizeObserver(this.onPageResize);
    this.pageResizeObserver.observe(this.pageRef.current);
  }

  public render() {
    const { pageEditorState, playFromHere } = this.props;

    return (
      <div className={'page-editor'}>
        <div className={'page-editor-toolbar-area'}>
          <PageEditorToolbar pageEditorState={pageEditorState} playFromHere={playFromHere} />
        </div>
        <div className={'page-edit-area'}>
          <PageContextMenu onAddItem={pageEditorState.addPageItem}>
            <div
              ref={this.pageRef}
              className={'page-display'}
              onClick={pageEditorState.onPageClick}
            >
              {this.renderPageItems()}
            </div>
          </PageContextMenu>
        </div>
      </div>
    );
  }

  private renderPageItems() {
    const { pageEditorState } = this.props;

    const selectedPage = pageEditorState.selectedPage;

    // Cannot render page items with the ref to the page display (after the editor mounts)
    if (pageEditorState.pageDiv && this.pageRect) {
      return selectedPage.items.map((item) => (
        <PageItemWidget
          key={`item-` + item.id}
          pageRect={this.pageRect}
          pageItem={item}
          selected={selectedPage.isItemSelected(item.id)}
          onClick={() => selectedPage.selectItem(item.id)}
          onDelete={selectedPage.deleteSelectedItem}
        />
      ));
    }

    // Return nothing until page editor ref is given
    return undefined;
  }

  @action private onPageResize = () => {
    if (this.pageRef.current) {
      this.pageRect = this.pageRef.current.getBoundingClientRect();
    }
  };
}

interface PageContextMenuProps {
  onAddItem: (mousePos: Vector) => void;
}

const PageContextMenu: React.FC<PageContextMenuProps> = ({ onAddItem, children }) => {
  return (
    <ContextMenu2
      content={
        <Menu>
          <MenuItem
            icon={'widget'}
            text={'Add page item here'}
            onClick={(e: React.MouseEvent) => onAddItem(new Vector(e.clientX, e.clientY))}
          />
        </Menu>
      }
    >
      {children}
    </ContextMenu2>
  );
};
