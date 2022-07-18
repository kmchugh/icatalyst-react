import {useCallback, useRef} from 'react';

const useLongPress = (callback, {
  interval = 100,
  delay = 1000
})=>{
  const timeoutRef = useRef(null);
  const cancelled = useRef(false);

  const start = useCallback((e, startCallback = callback)=>{
    e = e.evt || e;
    e.stopPropagation();
    e.preventDefault();

    cancelled.current = false;

    const intervalFn = (step)=>{
      timeoutRef.current = setTimeout(()=>{
        step += interval;
        if (!cancelled.current) {
          startCallback(e, {
            step,
            delay,
            complete : step >= delay,
            cancelled : false
          });
          if (step < delay) {
            intervalFn(step);
          }
        }
      }, interval);
    };
    intervalFn(0);
  }, [callback, interval, delay]);

  const stop = useCallback((e, stopCallback = callback)=>{
    cancelled.current = true;
    timeoutRef.current && clearInterval(timeoutRef.current);
    timeoutRef.current && stopCallback && stopCallback(e, {
      step: -1,
      delay: -1,
      complete : false,
      cancelled: true
    });
  });

  return [{
    onMouseDown: (e, callback)=>{
      start(e, callback);
    },
    onTouchStart: (e, callback)=>{
      start(e, callback);
    },
    onMouseUp: (e, callback)=>{
      stop(e, callback);
    },
    onMouseLeave: (e, callback)=>{
      stop(e, callback);
    },
    onTouchEnd: (e, callback)=>{
      stop(e, callback);
    }
  }, stop];
};

export default useLongPress;
