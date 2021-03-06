import { action, observable } from 'mobx';

import { Page } from '../../common/state/Page';
import { PanelTab } from '../../editor-root/state/EditorRootState';
import { StoryEventType, storyObserver } from '../../events/StoryEventObserver';
import { TabBaseState } from '../../editor-root/state/TabBaseState';

export class PageInspectorState extends TabBaseState {
  @observable public pages: Page[];
  @observable.ref public selectedPage: Page;

  constructor(tab: PanelTab, pages: Page[]) {
    super(tab);

    this.pages = pages;
    this.selectedPage = pages[0];
  }

  public getLinkablePages() {
    // For the inspected page link items link options - cannot link to same page
    return this.pages.filter((page) => page.id !== this.selectedPage.id);
  }

  @action public setSelectedPage = (page: Page) => {
    this.selectedPage = page;
  };

  public onLinkPageItem = (itemId: string, toId: string) => {
    // The 'from' page is the currently selected page
    storyObserver.fireEvent({
      type: StoryEventType.LINK_PAGE_ITEM,
      itemId,
      fromId: this.selectedPage.id,
      toId,
    });
  };

  public onUnlinkPageItem = (itemId: string) => {
    storyObserver.fireEvent({
      type: StoryEventType.UNLINK_PAGE_ITEM,
      itemId,
    });
  };
}
