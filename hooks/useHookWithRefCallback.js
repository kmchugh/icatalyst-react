import {useCallback, useRef} from 'react';

// based on https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
// updated the watch parameters on the useCallback for flexibility
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
