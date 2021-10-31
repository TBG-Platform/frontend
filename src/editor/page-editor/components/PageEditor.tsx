import { observer } from 'mobx-react';
import React from 'react';
import { PageEditorState } from '../state/PageEditorState';
import { PageEditorToolbar } from './PageEditorToolbar';
import { PageItemWidget } from '../../components/page/PageItemWidget';

import './page-editor.scss';

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
        </div>
      </div>
    );
  }
}
