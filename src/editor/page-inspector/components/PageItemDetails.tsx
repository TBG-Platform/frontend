import './page-item-details.scss';

import React from 'react';
import { Button, ButtonGroup, NonIdealState } from '@blueprintjs/core';
import { Observer, observer } from 'mobx-react';

import { ColorPicker } from '../../common/inputs/color-picker/ColorPicker';
import { DetailsSection } from '../../common/dividers/DetailsSection';
import { NumberInput, NumberInputSize } from '../../common/inputs/number-input/NumberInput';
import { PageItem } from '../../common/state/PageItem';
import { StandardDivider } from '../../common/dividers/StandardDivider';
import { TextAlign, TextDecoration } from '../../common/state/TextSettings';
import { TextAreaInput } from '../../common/inputs/text-area-input/TextAreaInput';

interface Props {
  pageItem: PageItem | undefined;
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
        {this.renderBackgroundSettings()}
        {this.renderContentSettings()}
      </div>
    );
  }

  private renderNoItemSelected() {
    return (
      <NonIdealState
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
        title={'Transform (%)'}
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

  private renderBackgroundSettings() {
    const { pageItem } = this.props;

    return (
      <DetailsSection
        title={'Background'}
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

  private renderLinkSettings() {
    return <DetailsSection title={'Link'} content={<div className={'link-content'}></div>} />;
  }
}
