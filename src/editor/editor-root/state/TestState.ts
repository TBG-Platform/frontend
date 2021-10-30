import { RandomUtils } from '../../../utils/RandomUtils';

export class TestState {
  public tabId: string;
  public message = RandomUtils.createId();

  constructor(tabId: string) {
    this.tabId = tabId;
  }
}
