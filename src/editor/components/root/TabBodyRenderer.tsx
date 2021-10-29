import React from 'react';
import { AppState, PanelTab } from '../../../AppState';
import { PanelTabType } from '../../state/panels/PanelTabType';
import { TestWidget } from './TestWidget';

export class TabBodyRenderer {
  public static getTabBody(tab: PanelTab, appState: AppState) {
    switch (tab.type) {
      case PanelTabType.TEST:
        const testState = appState.testStates.find((ts) => ts.tabId === tab.id);
        if (testState) {
          return <TestWidget testState={testState} />;
        }
    }

    // If there was no state or component for this tab type
    return <div>No state or component</div>;
  }
}
