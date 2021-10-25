import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelFocus, StoryEditorState } from '../../state/StoryEditorState';
import { PageItemWidget } from './PageItemWidget';
import { pageDisplayUtil } from '../../../utils/PageDisplayUtils';

import './page-display.scss';

interface Props {
  storyEditorState: StoryEditorState;
}

@observer
export class PageDisplay extends React.Component<Props> {
  private pageRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.pageRef.current) {
      pageDisplayUtil.setPageDisplay(this.pageRef.current);
    }
  }

  componentWillUnmount() {
    pageDisplayUtil.setPageDisplay(undefined);
  }

  public render() {
    const { storyEditorState } = this.props;
    const page = storyEditorState.story.selectedPage;

    return (
      <div ref={this.pageRef} className={'page-display'}>
        {page.items.map((item) => (
          <PageItemWidget
            key={'item-' + item.id}
            pageItem={item}
            selected={page.isItemSelected(item.id)}
            onClick={() => {
              page.selectItem(item.id);
              storyEditorState.setDetailsPanelFocus(DetailsPanelFocus.PAGE_ITEM);
            }}
            onDelete={page.deleteSelectedItem}
          />
        ))}
      </div>
    );
  }
}
