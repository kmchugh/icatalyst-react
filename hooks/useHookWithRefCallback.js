import {useCallback, useRef} from 'react';

function useHookWithRefCallback(callback, watch) {
  const ref = useRef(null);
  const setRef = useCallback(node => {
    if (node) {
      callback && callback(node);
    }
    ref.current = node;
    setRef.current = node;
  }, watch || []);
  return [setRef];
}

export default useHookWithRefCallback;
