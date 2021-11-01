import { observer } from 'mobx-react';
import React from 'react';
import { PageEditorState } from '../state/PageEditorState';
import { PageEditorToolbar } from './PageEditorToolbar';
import { PageItemWidget } from './PageItemWidget';

import './page-editor.scss';
import { Menu, MenuItem } from '@blueprintjs/core';
import { ContextMenu2 } from '@blueprintjs/popover2';
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

    const selectedPage = pageEditorState.selectedPage;

    return (
      <div className={'page-editor'}>
        <div className={'page-editor-toolbar-area'}>
          <PageEditorToolbar pageEditorState={pageEditorState} />
        </div>
        <div className={'page-edit-area'}>
          <PageContextMenu onAddItem={pageEditorState.addPageItem}>
            <div ref={this.pageRef} className={'page-display'}>
              {selectedPage.items.map((item) => (
                <PageItemWidget
                  key={`item-` + item.id}
                  pageDiv={pageEditorState.pageDiv}
                  pageItem={item}
                  selected={selectedPage.isItemSelected(item.id)}
                  onClick={() => console.log('clicked widget')}
                  onDelete={selectedPage.deleteSelectedItem}
                />
              ))}
            </div>
          </PageContextMenu>
        </div>
      </div>
    );
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
