/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );
}
