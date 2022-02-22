import { useCallback, useEffect, useRef, useState } from "react";

export function useSafeState(initialValue = null) {
  const isMounted = useRef(true);
  const [state, setState] = useState(initialValue);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const setStateSafe = useCallback((value) => {
    if (isMounted.current) {
      setState(value);
    }
  }, []);
  return [state, setStateSafe];
}
