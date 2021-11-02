import React from 'react';

import { EditorRootState, PanelTab } from '../state/EditorRootState';
import { PageEditor } from '../../page-editor/components/PageEditor';
import { PageInspector } from '../../page-inspector/components/PageInspector';
import { PanelTabType } from '../state/PanelTabType';
import { StoryGraph } from '../../story-graph/components/StoryGraph';
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
        const pageEditorState = editorState.pageEditorStates.find((pes) => pes.tabId === tab.id);
        if (pageEditorState) {
          return <PageEditor pageEditorState={pageEditorState} />;
        }
        break;
      case PanelTabType.PAGE_INSPECTOR:
        const inspectorState = editorState.pageInspectorStates.find((pis) => pis.tabId === tab.id);
        if (inspectorState) {
          return <PageInspector inspectorState={inspectorState} />;
        }
        break;
    }

    // If there was no state or component for this tab type
    return <div>No state or component</div>;
  }
}
