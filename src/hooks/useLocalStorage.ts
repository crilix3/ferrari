import { useState } from "react";
import type { SetStateAction } from "react";

const useLocalStorage = <T>(key: string, initValue: T | string | number) => {
  const [storedVal, setStoredVal] = useState(() => {
    if (typeof window === "undefined") return initValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item) return JSON.parse(item);
      return initValue;
    } catch (error: unknown) {
      console.log(error);
      return initValue;
    }
  });
  const setValue = <T>(value: T | SetStateAction<string | number>) => {
    try {
      let valueToStore;
      if (value instanceof Function) valueToStore = value(storedVal);
      else valueToStore = value;
      setStoredVal(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return { storedVal, setValue };
};

export default useLocalStorage;
