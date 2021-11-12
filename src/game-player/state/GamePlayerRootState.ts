import { observable } from 'mobx';

import { GamePage } from './GamePage';
import { GameStory } from './GameStory';

export class GamePlayerRootState {
  public story: GameStory;
  @observable.ref public currentPage: GamePage;

  constructor(story: GameStory) {
    this.story = story;

    // Find the first page
    this.currentPage = this.story.pages.find((page) => page.id === story.firstPageId);
  }
}
