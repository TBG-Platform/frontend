import './page-item-details.scss';

import React from 'react';
import { Button, ButtonGroup, NonIdealState } from '@blueprintjs/core';
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
import { StandardDivider } from '../../common/components/dividers/StandardDivider';
import { TextAlign, TextDecoration } from '../../common/state/TextSettings';
import { TextAreaInput } from '../../common/components/inputs/text-area-input/TextAreaInput';

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

    console.log('inspector render');

    if (!pageItem) {
      return <div className={'page-item-details'}>{this.renderNoItemSelected()}</div>;
    }

    return (
      <div className={'page-item-details'}>
        {this.renderTransformSettings()}
        {this.renderStyleSettings()}
        {this.renderContent()}
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

  private renderContent() {
    const { pageItem } = this.props;

    console.log('inspector render content');

    return (
      <DetailsSection
        title={'Content'}
        content={
          <div className={'item-content'}>
            <Observer>
              {() => (
                <RichTextInput
                  value={pageItem.textSettings.text}
                  onChange={pageItem.textSettings.setText}
                />
              )}
            </Observer>
          </div>
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
              {() => (
                <TextAreaInput
                  label={'Text'}
                  text={pageItem.textSettings.text}
                  onChange={pageItem.textSettings.setText}
                />
              )}
            </Observer>
            <div className={'text-settings-row'}>
              <ButtonGroup minimal>
                <Button
                  icon={'alignment-left'}
                  outlined={pageItem.textSettings.isXAlignSelected(TextAlign.START)}
                  onClick={() => pageItem.textSettings.setTextAlignX(TextAlign.START)}
                />
                <Button
                  icon={'alignment-horizontal-center'}
                  outlined={pageItem.textSettings.isXAlignSelected(TextAlign.CENTER)}
                  onClick={() => pageItem.textSettings.setTextAlignX(TextAlign.CENTER)}
                />
                <Button
                  icon={'alignment-right'}
                  outlined={pageItem.textSettings.isXAlignSelected(TextAlign.END)}
                  onClick={() => pageItem.textSettings.setTextAlignX(TextAlign.END)}
                />
              </ButtonGroup>

              <StandardDivider />

              <ButtonGroup minimal>
                <Button
                  icon={'alignment-top'}
                  outlined={pageItem.textSettings.isYAlignSelected(TextAlign.START)}
                  onClick={() => pageItem.textSettings.setTextAlignY(TextAlign.START)}
                />
                <Button
                  icon={'alignment-vertical-center'}
                  outlined={pageItem.textSettings.isYAlignSelected(TextAlign.CENTER)}
                  onClick={() => pageItem.textSettings.setTextAlignY(TextAlign.CENTER)}
                />
                <Button
                  icon={'alignment-bottom'}
                  outlined={pageItem.textSettings.isYAlignSelected(TextAlign.END)}
                  onClick={() => pageItem.textSettings.setTextAlignY(TextAlign.END)}
                />
              </ButtonGroup>
            </div>

            <div className={'text-settings-row'}>
              <ButtonGroup minimal>
                <Button
                  icon={'bold'}
                  outlined={pageItem.textSettings.bold}
                  onClick={pageItem.textSettings.toggleBold}
                />
                <Button
                  icon={'italic'}
                  outlined={pageItem.textSettings.italic}
                  onClick={pageItem.textSettings.toggleItalic}
                />
                <Button
                  icon={'underline'}
                  outlined={pageItem.textSettings.isDecorationSelected(TextDecoration.UNDERLINE)}
                  onClick={() => pageItem.textSettings.setDecoration(TextDecoration.UNDERLINE)}
                />
                <Button
                  icon={'strikethrough'}
                  outlined={pageItem.textSettings.isDecorationSelected(
                    TextDecoration.STRIKETHROUGH
                  )}
                  onClick={() => pageItem.textSettings.setDecoration(TextDecoration.STRIKETHROUGH)}
                />
              </ButtonGroup>
            </div>
            <div className='text-settings-row'>
              <ColorPicker
                color={pageItem.textSettings.color}
                setColor={pageItem.textSettings.setColor}
              />

              <NumberInput
                label={'Size %'}
                value={pageItem.textSettings.size}
                onChange={pageItem.textSettings.setSize}
                size={NumberInputSize.MEDIUM}
              />
            </div>
          </div>
        }
      />
    );
  }

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
