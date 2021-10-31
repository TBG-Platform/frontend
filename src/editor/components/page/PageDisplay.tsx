import { observer } from 'mobx-react';
import React, { MouseEvent } from 'react';

import { StoryEditorState } from '../../state/StoryEditorState';
import { PageItemWidget } from './PageItemWidget';
//import { pageDisplayUtil } from '../../../utils/PageDisplayUtils';
import { DetailsPanelFocus } from '../../state/DetailsPanelState';

//import './page-display.scss';
import { ContextMenu2 } from '@blueprintjs/popover2';
import { Menu, MenuItem } from '@blueprintjs/core';
import { Vector } from '../../../utils/Vector';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class PageDisplay extends React.Component<Props> {
  private pageRef = React.createRef<HTMLDivElement>();
  private resizeObserver: ResizeObserver;

  componentDidMount() {
    if (this.pageRef.current) {
      //pageDisplayUtil.setPageDisplay(this.pageRef.current);

      this.resizeObserver = new ResizeObserver((_entries: ResizeObserverEntry[]) => {
        // pageDisplayUtil.onPageDisplayResize();
      });

      this.resizeObserver.observe(this.pageRef.current);
    }
  }

  componentWillUnmount() {
    // pageDisplayUtil.clearPageDisplay();
  }

  public render() {
    const { storyEditorState } = this.props;
    const page = storyEditorState.story.selectedPage;

    return (
      <PageContextMenu onAddItem={storyEditorState.addPageItem}>
        <div ref={this.pageRef} className={'page-display'}>
          {page.items.map((item) => (
            <PageItemWidget
              key={'item-' + item.id}
              pageItem={item}
              selected={page.isItemSelected(item.id)}
              onClick={() => {
                page.selectItem(item.id);
                storyEditorState.detailsPanelState.setFocus(DetailsPanelFocus.PAGE_ITEM);
              }}
              onDelete={page.deleteSelectedItem}
            />
          ))}
        </div>
      </PageContextMenu>
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
