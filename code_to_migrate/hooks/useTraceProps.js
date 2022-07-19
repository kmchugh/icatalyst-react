import {useRef, useEffect} from 'react';

export default function useTraceProps(props, prefix = '') {
  const prev = useRef(props);
  useEffect(() => {
    const updatedProps = Object.entries(props).reduce((acc, [key, value]) => {
      if (prev.current[key] !== value) {
        acc[key] = [prev.current[key], value];
      }
      return acc;
    }, {});
    if (Object.keys(updatedProps).length > 0) {
      console.log(`${prefix} - Updated props:`, updatedProps);
    }
    prev.current = props;
  });
}
