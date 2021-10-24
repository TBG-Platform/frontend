import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
import { EnumUtils } from '../../utils/EnumUtils';

export enum TextAlign {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export enum TextDecoration {
  NONE = 'none',
  UNDERLINE = 'underline',
  STRIKETHROUGH = 'line-through',
}

export class TextSettings {
  @observable public text = '';
  @observable public xAlign: TextAlign;
  @observable public yAlign: TextAlign;
  @observable public bold: boolean;
  @observable public italic: boolean;
  @observable public decoration: TextDecoration;
  @observable public color: string;
  @observable public size: number;
  @observable public settings: CSSProperties;

  constructor(settings: CSSProperties) {
    this.settings = settings;

    // Apply default settings
    this.setDefaultValues();
  }

  public updateSettings(settings: CSSProperties, text: string) {
    this.settings = settings;
    this.text = text;

    this.fromSettings(settings);
  }

  public isXAlignSelected(textAlign: TextAlign) {
    return textAlign === this.xAlign;
  }

  public isYAlignSelected(textAlign: TextAlign) {
    return textAlign === this.yAlign;
  }

  public isDecorationSelected(textDecoration: TextDecoration) {
    return textDecoration === this.decoration;
  }

  @action public setText = (text: string) => {
    this.text = text;
  };

  @action public setTextAlignX(textAlign: TextAlign) {
    this.xAlign = textAlign;

    this.settings.justifyContent = this.xAlign;
  }

  @action public setTextAlignY(textAlign: TextAlign) {
    this.yAlign = textAlign;

    this.settings.alignItems = this.yAlign;
  }

  @action public toggleBold = () => {
    this.bold = !this.bold;

    if (this.bold) {
      this.settings.fontWeight = 'bold';
    } else {
      this.settings.fontWeight = 'normal';
    }
  };

  @action public toggleItalic = () => {
    this.italic = !this.italic;

    if (this.italic) {
      this.settings.fontStyle = 'italic';
    } else {
      this.settings.fontStyle = 'normal';
    }
  };

  @action public setDecoration(decoration: TextDecoration) {
    // Buttons toggle, but several values for decoration
    if (this.decoration === decoration) {
      this.decoration = TextDecoration.NONE;
    } else {
      this.decoration = decoration;
    }

    this.settings.textDecoration = this.decoration;
  }

  @action public setColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.color = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

    this.settings.color = this.color;
  };

  @action public setSize = (size: number) => {
    if (isNaN(size) || size < 0) {
      return;
    }

    this.size = size;
    this.settings.fontSize = `${this.size}px`;
  };

  @action public setDefaultValues() {
    this.setText('');
    this.setTextAlignX(TextAlign.START);
    this.setTextAlignY(TextAlign.START);
    this.setDecoration(TextDecoration.NONE);
    this.setSize(14);

    this.color = 'rgba(24, 32, 38, 1)';
    this.settings.color = 'rgba(24, 32, 38, 1)';

    this.bold = false;
    this.settings.fontWeight = 'normal';

    this.italic = false;
    this.settings.fontStyle = 'normal';
  }

  private fromSettings(settings: CSSProperties) {
    // Set values from settings
    this.xAlign = EnumUtils.getEnumKey(TextAlign, settings.justifyContent);
    this.yAlign = EnumUtils.getEnumKey(TextAlign, settings.alignItems);
    this.bold = settings.fontWeight === 'bold';
    this.italic = settings.fontStyle === 'italic';
    this.decoration = EnumUtils.getEnumKey(TextDecoration, settings.textDecoration as string);
    this.color = settings.color;
    const size = settings.fontSize as string;
    this.size = parseInt(size.split('px')[0]);
  }
}
