import { action, observable } from 'mobx';

import { Page } from './Page';
import { RandomUtils } from '../../../utils/RandomUtils';
import { StoryEventType, storyObserver } from '../../events/StoryEventObserver';
import { StoryModel } from '../model/StoryModel';

export class Story {
  public id = RandomUtils.createId();
  @observable public name = 'Untitled_story';
  @observable public pages: Page[] = [];

  public static fromModel(model: StoryModel) {
    const story = new Story();

    story.id = model.id;
    story.name = model.name;
    story.pages = model.pages.map((pageModel) => Page.fromModel(pageModel));

    return story;
  }

  public toModel(): StoryModel {
    return {
      id: this.id,
      name: this.name,
      pages: this.pages.map((page) => page.toModel()),
    };
  }

  @action public setName = (name: string) => {
    this.name = name;
  };

  @action public addPage = (page: Page) => {
    this.pages.push(page);

    storyObserver.fireEvent({ type: StoryEventType.NEW_PAGE, page });
  };
}
