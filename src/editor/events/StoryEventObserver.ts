import { Page } from '../common/state/Page';

export enum StoryEventType {
  ANY = 'event-any', // encompasses all event types
  NEW_PAGE = 'event-new-page',
  RENAME_PAGE = 'event-rename-page',
}

export type StoryEvent =
  | { type: StoryEventType.NEW_PAGE; page: Page }
  | { type: StoryEventType.RENAME_PAGE; page: Page };

type StoryEventListener = (event: StoryEvent) => void;

class StoryEventObserver {
  private listenerMap = new Map<StoryEventType, StoryEventListener[]>();

  public addGameEventListener(listener: StoryEventListener, eventType = StoryEventType.ANY) {
    const existing = this.listenerMap.get(eventType) ?? [];
    existing.push(listener);
    this.listenerMap.set(eventType, existing);
  }

  public removeGameEventListener(listener: StoryEventListener, eventType = StoryEventType.ANY) {
    let existing = this.listenerMap.get(eventType) ?? [];
    if (existing.length) {
      existing = existing.filter((l) => l !== listener);
      this.listenerMap.set(eventType, existing);
    }
  }

  public fireEvent(event: StoryEvent) {
    // Get the listeners that care about any event
    const anyListeners = this.listenerMap.get(StoryEventType.ANY) ?? [];
    anyListeners.forEach((l) => l(event));

    // Then the specific listeners for this event
    const listeners = this.listenerMap.get(event.type) ?? [];
    listeners.forEach((l) => l(event));
  }
}

export const storyObserver = new StoryEventObserver();
