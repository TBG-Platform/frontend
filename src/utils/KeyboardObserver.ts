type KeyListener = (key: string) => void;

class KeyboardObserver {
  private pressedKeys = new Set<string>();
  private keyListeners: KeyListener[] = [];
  private specificListeners = new Map<string, KeyListener[]>();

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  public addKeyListener(listener: KeyListener) {
    this.keyListeners.push(listener);
  }

  public addSpecificKeyListener(listener: KeyListener, keys: string[]) {
    keys.forEach((key) => {
      const existing = this.specificListeners.get(key) ?? [];
      existing.push(listener);
      this.specificListeners.set(key, existing);
    });
  }

  public removeKeyListener(listener: KeyListener) {
    this.keyListeners = this.keyListeners.filter((l) => l != listener);
  }

  public removeSpecificKeyListener(listener: KeyListener, keys: string[]) {
    keys.forEach((key) => {
      let existing = this.specificListeners.get(key);
      existing = existing.filter((l) => l !== listener);
      this.specificListeners.set(key, existing);
    });
  }

  private readonly onKeyDown = (e: KeyboardEvent) => {
    // Ensures listeners are only called once
    if (this.pressedKeys.has(e.key)) {
      return;
    }

    this.pressedKeys.add(e.key);
    this.keyListeners.forEach((kl) => kl(e.key));
    this.specificListeners.get(e.key)?.forEach((sl) => sl(e.key));
  };

  private readonly onKeyUp = (e: KeyboardEvent) => {
    this.pressedKeys.delete(e.key);
  };
}

export const keyboardObserver = new KeyboardObserver();
