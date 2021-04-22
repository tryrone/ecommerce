import { useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

function useInterval(callback, delay) {
  const savedCallback = useRef(null);

  useFocusEffect(
    useCallback(() => {
      savedCallback.current = callback;
    }, [callback]),
  );

  useFocusEffect(
    useCallback(() => {
      let id = -1;
      const tick = async function self() {
        if (typeof savedCallback.current === 'function') {
          await savedCallback.current();
          id = setTimeout(self, delay);
        }
      };
      if (delay !== null) {
        id = setTimeout(tick, delay);
        return () => {
          if (id !== -1) clearTimeout(id);
        };
      }
    }, [delay]),
  );
}

export default useInterval;
