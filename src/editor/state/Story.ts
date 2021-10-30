import { action, observable } from 'mobx';
import { StoryEventType, storyObserver } from '../events/StoryEventObserver';
import { Page } from './Page';

export class Story {
  @observable public name = 'Untitled_story';
  @observable public pages: Page[] = [];
  @observable.ref public selectedPage?: Page;

  @action public setName = (name: string) => {
    this.name = name;
  };

  @action public addPage = (page: Page) => {
    this.pages.push(page);

    storyObserver.fireEvent({ type: StoryEventType.NEW_PAGE, page });
  };

  @action public selectPage = (pageId: string) => {
    this.selectedPage = this.pages.find((page) => page.id === pageId);
  };
}
