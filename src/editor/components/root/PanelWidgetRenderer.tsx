import React from 'react';
import { AppState } from '../../../AppState';
import { PanelWidgetType } from '../../state/panels/PanelWidgetType';
import { PageDisplay } from '../page/PageDisplay';

export class PanelWidgetRenderer {
  public static getRenderer(panelWidgetType: PanelWidgetType, appState: AppState) {
    switch (panelWidgetType) {
      case PanelWidgetType.PAGE_DISPLAY:
        return <PageDisplay storyEditorState={appState.storyEditorState} />;
    }
  }
}
