import { CSSProperties } from 'react';

export interface GamePageItemProps {
  id: string;
  settings: CSSProperties;
  textSettings: CSSProperties;
  text: string;
  fontSizePercent: string;
  linkedPageId: string;
}

export class GamePageItem {
  public id: string;
  public settings: CSSProperties;
  public textSettings: CSSProperties;
  public text: string;
  public fontSizePercent: string;
  public linkedPageId: string;

  constructor(props: GamePageItemProps) {
    this.id = props.id;
    this.settings = props.settings;
    this.textSettings = props.textSettings;
    this.text = props.text;
    this.fontSizePercent = props.fontSizePercent;
    this.linkedPageId = props.linkedPageId;
  }
}
