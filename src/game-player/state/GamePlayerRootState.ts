import { observable } from 'mobx';

import { GamePage } from './GamePage';
import { GameStory } from './GameStory';

export class GamePlayerRootState {
  public story: GameStory;
  @observable.ref public currentPage: GamePage;

  private pageMap = new Map<string, GamePage>();

  constructor(story: GameStory) {
    this.story = story;

    // Build page map, assign item callbacks
    this.story.pages.forEach((page) => {
      this.pageMap.set(page.id, page);

      page.items.forEach((item) => {
        // If this item is interactive, apply on click
        if (item.linkedPageId) {
          item.onClickItem = this.onPageItemClick;
        }
      });
    });

    // Find the first page
    this.currentPage = this.pageMap.get(story.firstPageId);
  }

  public onPageItemClick = (itemId: string) => {
    console.log('clicked me!', itemId);
  };
}
