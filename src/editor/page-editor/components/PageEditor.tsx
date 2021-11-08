import './page-editor.scss';

import React from 'react';
import { ContextMenu2 } from '@blueprintjs/popover2';
import { Menu, MenuItem } from '@blueprintjs/core';
import { observer } from 'mobx-react';

import { PageEditorState } from '../state/PageEditorState';
import { PageEditorToolbar } from './PageEditorToolbar';
import { PageItemWidget } from './PageItemWidget';
import { Vector } from '../../../utils/Vector';

interface Props {
  pageEditorState: PageEditorState;
}

@observer
export class PageEditor extends React.Component<Props> {
  private pageRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.pageRef.current) {
      this.props.pageEditorState.setPageDiv(this.pageRef.current);
    }
  }

  public render() {
    const { pageEditorState } = this.props;

    return (
      <div className={'page-editor'}>
        <div className={'page-editor-toolbar-area'}>
          <PageEditorToolbar pageEditorState={pageEditorState} />
        </div>
        <div className={'page-edit-area'}>
          <PageContextMenu onAddItem={pageEditorState.addPageItem}>
            <div ref={this.pageRef} className={'page-display'}>
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
    if (pageEditorState.pageDiv) {
      return selectedPage.items.map((item) => (
        <PageItemWidget
          key={`item-` + item.id}
          pageDiv={pageEditorState.pageDiv}
          pageItem={item}
          selected={selectedPage.isItemSelected(item.id)}
          onClick={() => console.log('clicked widget')}
          onDelete={selectedPage.deleteSelectedItem}
        />
      ));
    }

    // Return nothing until page editor ref is given
    return undefined;
  }
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
            text={'Add widget here'}
            onClick={(e: React.MouseEvent) => onAddItem(new Vector(e.clientX, e.clientY))}
          />
        </Menu>
      }
    >
      {children}
    </ContextMenu2>
  );
};
