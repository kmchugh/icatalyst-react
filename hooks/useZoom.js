import {useState, useEffect} from 'react';
import _ from '../@lodash';

const defaultSettings = {
  interval : 0.1,
  min_zoom : 0.5,
  max_zoom : 5,
  initial_zoom: 1,
};

const useZoom = (ref, config)=>{
  const {
    interval,
    min_zoom,
    max_zoom,
    initial_zoom
  } = _.merge({}, defaultSettings, config);

  const [zoom, setZoom] = useState(initial_zoom);

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

  const wheelListener = (e)=>{
    e.preventDefault();

    updateZoom({
      direction: e.deltaY > 0 ? 'up' : 'down',
      interval
    });
  };

  useEffect(()=>{
    if (ref && ref.current) {
      ref.current.addEventListener('wheel', wheelListener);
      return ()=>{
        ref.current.removeEventListener('wheel', wheelListener);
      };
    }
  }, [ref]);

  return [zoom, setZoomValidated];

};

export default useZoom;
