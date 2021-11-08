import React from 'react';

import { EditorRootState, PanelTab } from '../state/EditorRootState';
import { PageEditor } from '../../page-editor/components/PageEditor';
import { PageEditorState } from '../../page-editor/state/PageEditorState';
import { PageInspector } from '../../page-inspector/components/PageInspector';
import { PageInspectorState } from '../../page-inspector/state/PageInspectorState';
import { PanelTabType } from '../state/PanelTabType';
import { StoryGraph } from '../../story-graph/components/StoryGraph';

export class TabBodyRenderer {
  public static makeTabRenderer(tab: PanelTab, editorState: EditorRootState) {
    switch (tab.type) {
      case PanelTabType.STORY_GRAPH:
        return (
          <StoryGraph key={`story-graph-${tab.id}`} storyGraphState={editorState.storyGraphState} />
        );
      case PanelTabType.PAGE_EDITOR:
        const pes = editorState.tabStatesMap.get(tab.id);
        if (pes) {
          return (
            <PageEditor key={`page-editor-${tab.id}`} pageEditorState={pes as PageEditorState} />
          );
        }
        break;
      case PanelTabType.PAGE_INSPECTOR:
        const pis = editorState.tabStatesMap.get(tab.id);
        if (pis) {
          return (
            <PageInspector
              key={`page-inspector-${tab.id}`}
              inspectorState={pis as PageInspectorState}
            />
          );
        }
        break;
    }
  }
}
