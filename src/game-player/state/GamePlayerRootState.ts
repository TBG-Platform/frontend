import { GameStory } from './GameStory';

export class GamePlayerRootState {
  public story: GameStory;

  constructor(story: GameStory) {
    this.story = story;
  }
}
