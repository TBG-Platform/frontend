import { computed, observable } from 'mobx';

class PageDisplayUtil {
  private pageDisplay?: HTMLDivElement;

  public setPageDisplay(div?: HTMLDivElement) {
    this.pageDisplay = div;
  }

  public getPageDisplay() {
    return this.pageDisplay;
  }

  public getPageDisplayBounds() {
    return this.pageDisplay.getBoundingClientRect();
  }
}

export const pageDisplayUtil = new PageDisplayUtil();
