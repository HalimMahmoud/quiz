import { useMemo, useSyncExternalStore } from "react";

export function useLocalStorage<T>(key: string) {
  const setValue = (newValue: T | null) => {
    if (newValue === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
    window.dispatchEvent(
      new StorageEvent("storage", { key, newValue: JSON.stringify(newValue) })
    );
  };

  const getSnapshot = () => {
    return localStorage.getItem(key) as string;
  };

  const subscribe = (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  };

  const store = useSyncExternalStore(subscribe, getSnapshot);

  const value = useMemo(() => store, [store]);
  const removeValue = () => {
    window.localStorage.removeItem(key);
  };
  return [value, setValue, removeValue] as const;
}
