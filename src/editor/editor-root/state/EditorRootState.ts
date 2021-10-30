import { RandomUtils } from '../../../utils/RandomUtils';
import { DockableUIState } from '../../dockable-ui/state/DockableUIState';
import { DuiPanelTab } from '../../dockable-ui/state/DuiPanel';
import { Page } from '../../state/Page';
import { Story } from '../../state/Story';
import { StoryGraphState } from '../../story-graph/state/StoryGraphState';
import { PanelTabType } from './PanelTabType';
import { TestState } from './TestState';

export interface PanelTab extends DuiPanelTab {
  type: PanelTabType;
}

export class EditorRootState {
  public story: Story;
  public storyGraphState = new StoryGraphState();
  public dockableUiState: DockableUIState;
  public testStates: TestState[] = [];
  private tabMap = new Map<string, PanelTab>();

  constructor() {
    // Setup story - will be done elsewhere later and passed into constructor
    const story = new Story();
    const firstPage = new Page();
    firstPage.setName('First page');
    story.addPage(firstPage);
    this.storyGraphState.addPageNode(firstPage.id, firstPage.name);
    this.story = story;

    this.dockableUiState = new DockableUIState();
    this.dockableUiState.addEventListener('close-tab', this.onCloseTab);
  }

  public addTab = (panelId: string, tabType: PanelTabType) => {
    // Create the tab to pass to dockable ui state
    const tabId = RandomUtils.createId();
    const tab: PanelTab = {
      id: tabId,
      label: tabType,
      type: tabType,
    };
    this.tabMap.set(tab.id, tab);

    // Setup any states this tab requires
    this.createTabState(tab);

    // Give it to dockable ui to render
    this.dockableUiState.addPanelTab(panelId, tab);
  };

  public getTab(id: string): PanelTab | undefined {
    return this.tabMap.get(id);
  }

  private createTabState(tab: PanelTab) {
    // Create whatever state this tab component requires
    switch (tab.type) {
      case PanelTabType.TEST:
        const testState = new TestState(tab.id);
        this.testStates.push(testState);
        break;
    }
  }

  private onCloseTab = (tabId: string) => {
    // Remove any states made for this tab
    const tab = this.tabMap.get(tabId);
    this.removeTabState(tab);

    // Then remove the tab from the map
    this.tabMap.delete(tabId);
  };

  private removeTabState(tab: PanelTab) {
    switch (tab.type) {
      case PanelTabType.TEST:
        this.testStates = this.testStates.filter((ts) => ts.tabId !== tab.id);
        break;
    }
  }
}
