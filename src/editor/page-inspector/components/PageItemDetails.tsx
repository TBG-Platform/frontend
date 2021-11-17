import './page-item-details.scss';

import React from 'react';
import { Button, NonIdealState } from '@blueprintjs/core';
import { Observer, observer } from 'mobx-react';

import { ColorPicker } from '../../common/components/inputs/color-picker/ColorPicker';
import { DetailsSection } from '../../common/components/dividers/DetailsSection';
import {
  NumberInput,
  NumberInputSize,
} from '../../common/components/inputs/number-input/NumberInput';
import { Page } from '../../common/state/Page';
import { PageItem } from '../../common/state/PageItem';
import { PageSelector } from '../../common/components/inputs/page-selector/PageSelector';
import { RichTextInput } from '../../common/components/inputs/rich-text-input/RichTextInput';

interface Props {
  pageItem: PageItem | undefined;
  linkablePages: Page[];
  onLinkPageItem: (itemId: string, toId: string) => void;
  onUnlinkPageItem: (itemId: string) => void;
}

@observer
export class PageItemDetails extends React.Component<Props> {
  public render() {
    const { pageItem } = this.props;

    if (!pageItem) {
      return <div className={'page-item-details'}>{this.renderNoItemSelected()}</div>;
    }

    return (
      <div className={'page-item-details'}>
        {this.renderTransformSettings()}
        {this.renderStyleSettings()}
        {this.renderContentSettings()}
        {this.renderEventSettings()}
      </div>
    );
  }

  private renderNoItemSelected() {
    return (
      <NonIdealState
        className={'no-items-state'}
        icon={'widget'}
        title={'No item selected'}
        description={'Select an item on the page, or create a new one'}
      />
    );
  }

  private renderTransformSettings() {
    const { pageItem } = this.props;

    return (
      <DetailsSection
        title={'Transform'}
        content={
          <div className={'transform-content'}>
            <div className={'section-column'}>
              <Observer>
                {() => (
                  <NumberInput
                    label={'W'}
                    value={pageItem.width}
                    onChange={pageItem.setWidth}
                    size={NumberInputSize.MEDIUM}
                  />
                )}
              </Observer>
              <Observer>
                {() => (
                  <NumberInput
                    label={'H'}
                    value={pageItem.height}
                    onChange={pageItem.setHeight}
                    size={NumberInputSize.MEDIUM}
                  />
                )}
              </Observer>
            </div>
            <div className={'section-column'}>
              <Observer>
                {() => (
                  <NumberInput
                    label={'X'}
                    value={pageItem.left}
                    onChange={pageItem.setLeft}
                    size={NumberInputSize.MEDIUM}
                  />
                )}
              </Observer>
              <Observer>
                {() => (
                  <NumberInput
                    label={'Y'}
                    value={pageItem.top}
                    onChange={pageItem.setTop}
                    size={NumberInputSize.MEDIUM}
                  />
                )}
              </Observer>
            </div>
          </div>
        }
      />
    );
  }

  private renderStyleSettings() {
    const { pageItem } = this.props;

    return (
      <DetailsSection
        title={'Style'}
        content={
          <ColorPicker
            label={'Fill'}
            color={pageItem.settings.backgroundColor}
            setColor={pageItem.setBackgroundColor}
          />
        }
      />
    );
  }

  private renderContentSettings() {
    const { pageItem } = this.props;

    return (
      <DetailsSection
        title={'Content'}
        content={
          <div className={'item-content'}>
            <Observer>
              {() => <RichTextInput value={pageItem.text} onChange={this.handleContentChange} />}
            </Observer>
          </div>
        }
      />
    );
  }

  private handleContentChange = (text: string) => {
    const { pageItem } = this.props;

    // This wrapper is necessary, otherwise the rich text editor keeps a ref to first item given
    pageItem.setText(text);
  };

  private renderEventSettings() {
    const { linkablePages, pageItem, onLinkPageItem, onUnlinkPageItem } = this.props;

    const linkedPage = pageItem.linkedPage?.name ?? 'No linked page';

    return (
      <DetailsSection
        title={'Events'}
        content={
          <div className={'link-content'}>
            Go to page:
            <PageSelector
              pages={linkablePages}
              onSelect={(page: Page) => {
                pageItem.setLinkedPage(page);
                onLinkPageItem(pageItem.id, page.id);
              }}
              noResultsText={'No other pages to link!'}
              target={<Button text={linkedPage} minimal outlined rightIcon={'chevron-down'} />}
            />
            <Button
              text={'Unlink'}
              minimal
              outlined
              disabled={pageItem.linkedPage === undefined}
              onClick={() => {
                pageItem.unlinkPage();
                onUnlinkPageItem(pageItem.id);
              }}
            />
          </div>
        }
      />
    );
  }
}
