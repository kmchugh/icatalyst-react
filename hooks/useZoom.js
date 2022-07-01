import {useState, useEffect, useRef} from 'react';
// import _ from '../@lodash';
import _ from '../@lodash/@lodash';

const defaultSettings = {
  interval : 0.1,
  min_zoom : 0.5,
  max_zoom : 5,
  initial_zoom: 1,
};

 export const useZoom = (ref, config)=>{
  const {
    interval,
    min_zoom,
    max_zoom,
    initial_zoom
  } = _.merge({}, defaultSettings, config);

  const [zoom, setZoom] = useState(initial_zoom);
  const lastZoom = useRef(zoom);

  const pinchReference = useRef({
    d : 0,
    z : 1
  });
  const allowZoom = useRef(true);

  const setAllowZoom = (value)=>{
    allowZoom.current = Boolean(value);
  };

  const setZoomValidated = (value)=>{
    if (value < min_zoom) {
      value = min_zoom;
    } else if (value > max_zoom) {
      value = max_zoom;
    }
    setZoom(()=>{
      return value;
    });
  };

 const updateZoom = ({direction, interval})=>{
    setZoom((state)=>{
      if (direction === 'up' && state + interval < max_zoom) {
        // Okay to increment
        state = state + interval;
      } else if (direction === 'up') {
        // Clamp to max
        state = max_zoom;
      } else if (direction === 'down' && state - interval > min_zoom) {
        // Okay to decrement
        state = state - interval;
      } else if (direction === 'down'){
        // Clamp to min
        state = min_zoom;
      }
      return state;
    });
  };

  const getDistance = ([p1, p2])=>{
    return Math.sqrt(
      Math.pow(p1.x - p2.x, 2) +
      Math.pow(p1.y - p2.y, 2)
    );
  };

  useEffect(()=>{
    lastZoom.current = zoom;
  }, [zoom]);

  const wheelListener = (e)=>{
    if (allowZoom.current) {
      e.preventDefault();
      updateZoom({
        direction: e.deltaY > 0 ? 'down' : 'up',
        interval
      });
    }
  };

  const touchStart = (e)=>{
    if (allowZoom.current) {
      e = e.evt || e;
      // Only do anything if there are 2 touches
      if (e.touches && e.touches.length === 2) {
        e.preventDefault();
        // We don't know anything yet as we just started the pinch
        // measure the distance of the two points and store our current zoom
        pinchReference.current.d = getDistance([e.touches[0], e.touches[1]].map((t)=>({
          x : t.pageX,
          y : t.pageY
        })));
        pinchReference.current.z = lastZoom.current;
      }
    }
  };

  const touchMove = (e)=>{
    if (pinchReference &&
      pinchReference.current &&
      pinchReference.current.d > 0) {
      e = e.evt || e;
      if (e.touches && e.touches.length === 2) {
        const distance = getDistance([e.touches[0], e.touches[1]].map((t)=>({
          x : t.pageX,
          y : t.pageY
        })));
        setZoom(pinchReference.current.z * distance/pinchReference.current.d);
      }
    }

  };

  const touchEnd = ()=>{
    pinchReference.current.d = 0;
    pinchReference.current.z = 1;
  };

  useEffect(()=>{
    if (ref && ref.current) {
      const element = ref.current;
      element.addEventListener('wheel', wheelListener);
      element.addEventListener('touchstart', touchStart);
      element.addEventListener('touchmove', touchMove);
      element.addEventListener('touchend', touchEnd);
      return ()=>{
        element.removeEventListener('wheel', wheelListener);
        element.removeEventListener('touchstart', touchStart);
        element.removeEventListener('touchmove', touchMove);
        element.removeEventListener('touchend', touchEnd);
      };
    }
  }, [ref]);

  return [zoom, setZoomValidated, allowZoom.current, setAllowZoom];

};

