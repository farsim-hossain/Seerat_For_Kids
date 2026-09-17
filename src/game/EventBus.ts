type Listener = (...args: any[]) => void;

class SimpleEventEmitter {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, fn: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(fn);
  }

  off(event: string, fn: Listener) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((l) => l !== fn);
  }

  removeListener(event: string, fn: Listener) {
    this.off(event, fn);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) return;
    // Copy array to prevent mutation issues during dispatch
    [...this.listeners[event]].forEach((fn) => {
      try {
        fn(...args);
      } catch (err) {
        console.error(`Error in event listener for ${event}:`, err);
      }
    });
  }
}

// Universal EventEmitter safe for SSR and Client
export const EventBus = new SimpleEventEmitter();

export let currentAppLanguage: 'bn' | 'en' = 'bn';
export let currentAppSection: '1.1' | '1.2' | '1.3' = '1.1';

export const setAppLanguage = (lang: 'bn' | 'en') => {
  currentAppLanguage = lang;
  EventBus.emit(GAME_EVENTS.LANGUAGE_CHANGED, lang);
};

export const setAppSection = (sec: '1.1' | '1.2' | '1.3') => {
  currentAppSection = sec;
  EventBus.emit(GAME_EVENTS.SWITCH_SECTION, sec);
};

export const GAME_EVENTS = {
  LOCATION_SELECTED: 'LOCATION_SELECTED',
  PORTFOLIO_SELECTED: 'PORTFOLIO_SELECTED',
  RELIGIOUS_STATION_SELECTED: 'RELIGIOUS_STATION_SELECTED',
  SCENE_READY: 'SCENE_READY',
  SCENE_CHANGED: 'SCENE_CHANGED',
  JOURNAL_UPDATED: 'JOURNAL_UPDATED',
  SWITCH_SCENE: 'SWITCH_SCENE',
  SWITCH_SECTION: 'SWITCH_SECTION',
  CELEBRATE: 'CELEBRATE',
  LANGUAGE_CHANGED: 'LANGUAGE_CHANGED',
};
