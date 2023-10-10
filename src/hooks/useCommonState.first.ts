import { useCallback, useEffect, useState } from 'react';

type Listener<T = any> = (data: T) => void;

interface EventMap {
  [event: string]: Listener[];
}

class EventEmitter {
  private events: EventMap = {};

  on<T>(event: string, listener: Listener<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: Listener): void {
    if (!this.events[event]) return;
    const index = this.events[event].indexOf(listener);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }

  emit<T>(event: string, data: T): void {
    if (!this.events[event]) return;
    for (const listener of this.events[event]) {
      listener(data);
    }
  }
}
const emitter = new EventEmitter();

const store = new Map<string, any>();

export const useCommonState = <T,>(
  key: string,
  initialState: T,
): [T, (arg: T) => void] => {
  const getInitialStateValue = () => {
    if (store.has(key)) {
      return store.get(key);
    } else {
      store.set(key, initialState);
      return initialState;
    }
  };

  const [state, setState] = useState<T>(getInitialStateValue());

  useEffect(() => {
    const updateState = (newValue: T) => setState(newValue);
    emitter.on(key, updateState);
    return function clean() {
      emitter.off(key, updateState);
    };
  }, [key]);

  const handleChange = useCallback(
    (value: T) => {
      store.set(key, value);
      emitter.emit(key, value);
    },
    [key],
  );

  return [state, handleChange];
};
