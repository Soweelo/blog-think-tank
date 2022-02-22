import { useCallback, useEffect, useRef } from "react";

export function useFetch() {
  const abortController = useRef(new AbortController());
  useEffect(() => () => abortController.current.abort(), []);

  return useCallback((url, options) => {
    return fetch(url, { ...options, signal: abortController.current.signal });
  }, []);
}
