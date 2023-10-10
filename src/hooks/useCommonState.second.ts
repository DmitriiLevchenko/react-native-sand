import { useCallback, useEffect, useState } from 'react';

type Listener<T = any> = (value: T) => void;

class Observer<T> {
  private listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  removeListener(listener: Listener<T>): void {
    this.listeners = this.listeners.filter((el) => el !== listener);
  }

  notify(data: T): void {
    for (const listener of this.listeners) {
      listener(data);
    }
  }
}

const store = new Map<string, any>();
const observers = new Map<string, Observer<any>>();

export const useCommonState = <T>(key: string, initialState: T): [T, (data: T) => void] => {
  const getInitialStateValue = (): T => {
    if (store.has(key)) {
      return store.get(key);
    } else {
      store.set(key, initialState);
      return initialState;
    }
  };

  const [state, setState] = useState<T>(getInitialStateValue());

  useEffect(() => {
    if (!observers.has(key)) {
      observers.set(key, new Observer<T>());
    }
    const currentObserver = observers.get(key);
    currentObserver?.addListener(setState);

    return function cleanup() {
      currentObserver?.removeListener(setState);
    };
  }, [key]);

  const handleChange = useCallback((data: T) => {
    store.set(key, data);
    if (observers.has(key)) {
      const observer = observers.get(key);
      observer?.notify(data);
    }
  }, [key]);

  return [state, handleChange];
};