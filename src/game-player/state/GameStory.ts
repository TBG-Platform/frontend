import { GamePage } from './GamePage';

export interface GameStoryProps {
  id: string;
  name: string;
  pages: GamePage[];
}

export class GameStory {
  public id: string;
  public name: string;
  public pages: GamePage[];

  constructor(props: GameStoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.pages = props.pages;
  }
}
