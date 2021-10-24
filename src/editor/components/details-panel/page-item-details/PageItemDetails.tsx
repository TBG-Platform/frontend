import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { ColorPicker } from '../../../../common/inputs/color-picker/ColorPicker';
import { NumberInput, NumberInputSize } from '../../../../common/inputs/number-input/NumberInput';
import { TextAreaInput } from '../../../../common/inputs/text-area-input/TextAreaInput';

import { PageItem } from '../../../state/PageItem';
import { TextAlign, TextDecoration } from '../../../state/TextSettings';

import './page-item-details.scss';

interface Props {
  pageItem: PageItem;
}

@observer
export class PageItemDetails extends React.Component<Props> {
  public render() {
    return (
      <div className={'page-item-details'}>
        {this.renderTransformSettings()}
        {this.renderBackgroundSettings()}
        {this.renderContentSettings()}
      </div>
    );
  }

  private renderTransformSettings() {
    const { pageItem } = this.props;

    return (
      <div className={'section transform'}>
        <div className={'section-title'}>Transform</div>
        <div className={'section-content'}>
          <div className={'section-column'}>
            <NumberInput
              label={'W'}
              value={pageItem.width}
              onChange={pageItem.setWidth}
              size={NumberInputSize.MEDIUM}
            />
            <NumberInput
              label={'H'}
              value={pageItem.height}
              onChange={pageItem.setHeight}
              size={NumberInputSize.MEDIUM}
            />
          </div>
          <div className={'section-column'}>
            <NumberInput
              label={'X'}
              value={pageItem.left}
              onChange={pageItem.setLeft}
              size={NumberInputSize.MEDIUM}
            />
            <NumberInput
              label={'Y'}
              value={pageItem.top}
              onChange={pageItem.setTop}
              size={NumberInputSize.MEDIUM}
            />
          </div>
        </div>
      </div>
    );
  }

  private renderBackgroundSettings() {
    const { pageItem } = this.props;

    return (
      <div className={'section background'}>
        <div className={'section-title'}>Background</div>
        <div className={'section-content'}>
          <ColorPicker
            label={'Fill'}
            color={pageItem.settings.backgroundColor}
            setColor={pageItem.setBackgroundColor}
          />
        </div>
      </div>
    );
  }

  private renderContentSettings() {
    const { pageItem } = this.props;

    return (
      <div className={'section content'}>
        <div className={'section-title'}>Content</div>
        <div className={'section-content'}>
          <TextAreaInput
            label={'Text'}
            text={pageItem.textSettings.text}
            onChange={pageItem.textSettings.setText}
          />
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

            <Divider className={'divider'} />

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
                outlined={pageItem.textSettings.isDecorationSelected(TextDecoration.STRIKETHROUGH)}
                onClick={() => pageItem.textSettings.setDecoration(TextDecoration.STRIKETHROUGH)}
              />
            </ButtonGroup>

            <Divider className={'divider'} />

            <ColorPicker
              color={pageItem.textSettings.color}
              setColor={pageItem.textSettings.setColor}
            />

            <NumberInput
              label={'Size'}
              value={pageItem.textSettings.size}
              onChange={pageItem.textSettings.setSize}
              size={NumberInputSize.SMALL}
            />
          </div>
        </div>
      </div>
    );
  }
}