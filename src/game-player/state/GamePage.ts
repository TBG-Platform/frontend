import { GamePageItem } from './GamePageItem';

export interface GamePageProps {
  id: string;
  name: string;
  items: GamePageItem[];
}

export class GamePage {
  public id: string;
  public name: string;
  public items: GamePageItem[];

  constructor(props: GamePageProps) {
    this.id = props.id;
    this.name = props.name;
    this.items = props.items;
  }
}
