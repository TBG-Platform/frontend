type ResizeListener = () => void;

class PageDisplayUtil {
  private pageDisplay?: HTMLDivElement;
  private resizeListeners: ResizeListener[] = [];

  public getPageDisplay() {
    return this.pageDisplay;
  }

  public getPageDisplayBounds() {
    return this.pageDisplay.getBoundingClientRect();
  }

  public setPageDisplay(div: HTMLDivElement) {
    this.pageDisplay = div;
  }

  public clearPageDisplay() {
    this.pageDisplay = undefined;
  }

  public addResizeListener(listener: ResizeListener) {
    this.resizeListeners.push(listener);
  }

  public removeResizeListener(listener: ResizeListener) {
    this.resizeListeners = this.resizeListeners.filter((l) => l != listener);
  }

  public onPageDisplayResize = () => {
    this.resizeListeners.forEach((l) => l());
  };
}

export const pageDisplayUtil = new PageDisplayUtil();
