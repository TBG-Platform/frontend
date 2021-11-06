import { observable } from 'mobx';

import { Page } from '../../common/state/Page';
import { PanelTab } from '../../editor-root/state/EditorRootState';
import { TabBaseState } from '../../editor-root/state/TabBaseState';

export class PageInspectorState extends TabBaseState {
  @observable public pages: Page[];
  @observable.ref public selectedPage: Page;

  constructor(tab: PanelTab, pages: Page[]) {
    super(tab);

    this.pages = pages;
    this.selectedPage = pages[0];

    // TODO - editorRootstate should detect which page is being edited
    // and send that in this constructor when creating the tab
  }
}
