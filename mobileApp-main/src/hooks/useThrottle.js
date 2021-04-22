import { useRef, useEffect, useMemo } from 'react';
import throttle from 'lodash.throttle';

const useThrottle = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const throttled = useMemo(() => {
    return throttle((...args) => {
      if (savedCallback.current) {
        savedCallback.current(...args);
      }
    }, delay);
  }, [delay]);

  return throttled;
};

export default useThrottle;
