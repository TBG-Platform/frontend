import { PanelTab } from './EditorRootState';

export abstract class TabBaseState {
  constructor(public tab: PanelTab) {}
}
