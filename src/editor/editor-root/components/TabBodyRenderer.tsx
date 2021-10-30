import React from 'react';
import { PageEditor } from '../../page-editor/components/PageEditor';
import { StoryGraph } from '../../story-graph/components/StoryGraphDetails';
import { EditorRootState, PanelTab } from '../state/EditorRootState';
import { PanelTabType } from '../state/PanelTabType';
import { TestWidget } from './TestWidget';

export class TabBodyRenderer {
  public static getTabBody(tab: PanelTab, editorState: EditorRootState) {
    switch (tab.type) {
      case PanelTabType.TEST:
        const testState = editorState.testStates.find((ts) => ts.tabId === tab.id);
        if (testState) {
          return <TestWidget testState={testState} />;
        }
        break;
      case PanelTabType.STORY_GRAPH:
        return <StoryGraph storyGraphState={editorState.storyGraphState} />;
      case PanelTabType.PAGE_EDITOR:
        return <PageEditor />;
    }

    // If there was no state or component for this tab type
    return <div>No state or component</div>;
  }
}
