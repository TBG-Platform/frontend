import React from 'react';
import { PanelTabType } from '../../state/panels/PanelTabType';
import { TestWidget } from './TestWidget';

export class TabBodyRenderer {
  public static getTabBody(tabType: PanelTabType) {
    switch (tabType) {
      case PanelTabType.TEST:
        return <TestWidget />;
    }
  }
}
