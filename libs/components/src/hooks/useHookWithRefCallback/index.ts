import { DependencyList, MutableRefObject, useCallback, useRef } from 'react';

// based on https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
// updated the watch parameters on the useCallback for flexibility
function useHookWithRefCallback<T = null>(
    callback: (ref: T) => void,
    deps: DependencyList = []
): [React.MutableRefObject<T>] {
    const ref = useRef<T | null>(null);
    const setRef: MutableRefObject<T> = useCallback((node: T) => {
        if (node) {
            callback && callback(node);
        }
        ref.current = node;
        setRef.current = node;
    }, deps) as unknown as MutableRefObject<T>;
    return [setRef];
}

export default useHookWithRefCallback;