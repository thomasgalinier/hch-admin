import { useEffect, useState } from "react";

export function useLocalstorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`useLocalStorage: error writing key "${key}"`, error);
    }
  }, [key, value]);
  return [value, setValue] as const;
}
