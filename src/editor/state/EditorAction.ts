export enum EditorActionType {
  ADD_TEXT = 'add-text',
}

export class EditorAction {
  public cursor = 'default';
  public type: EditorActionType;

  constructor(type: EditorActionType) {
    this.type = type;

    // Perform setup for this action
    switch (type) {
      case EditorActionType.ADD_TEXT:
        document.addEventListener('click', this.onMouseClick);
        break;
    }
  }

  destructor() {
    document.removeEventListener('click', this.onMouseClick);
  }

  private onMouseClick = (e: MouseEvent) => {
    console.log('clicked');
  };
}
