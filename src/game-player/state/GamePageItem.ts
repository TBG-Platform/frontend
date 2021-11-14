import { CSSProperties } from 'react';

export interface GamePageItemProps {
  id: string;
  settings: CSSProperties;
  text: string;
  linkedPageId: string;
}

export class GamePageItem {
  public id: string;
  public settings: CSSProperties;
  public text: string;
  public fontSizePercent: string;
  public linkedPageId: string;

  constructor(props: GamePageItemProps) {
    this.id = props.id;
    this.settings = props.settings;
    this.text = props.text;
    this.linkedPageId = props.linkedPageId;
  }

  // To be overriden by root state for applicable items
  public onClickItem = (_id: string) => {};
}
