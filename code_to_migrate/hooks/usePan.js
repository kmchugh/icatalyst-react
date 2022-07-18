import {useState, useRef, useCallback} from 'react';

const ORIGIN = Object.freeze({x: 0, y:0});

const usePan = ()=>{
  const [panPosition, setPanPosition] = useState(ORIGIN);
  const [isPanning, setIsPanning] = useState(false);

  // UseRef for ease of access
  const lastPoint = useRef(ORIGIN);

  const trackPan = useCallback((e)=>{
    e = e.evt || e;
    const prevPoint = lastPoint.current;

    if (e.touches && e.touches.length > 1) {
      // If there is more than one touch target then
      // we are not panning.
      return;
    }

    const currentPoint = e.touches ? {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    } : {
      x: e.pageX,
      y: e.pageY
    };
    lastPoint.current = currentPoint;

    setPanPosition((state)=>{
      return {
        x: state.x + (prevPoint.x - currentPoint.x),
        y: state.y + (prevPoint.y - currentPoint.y)
      };
    });

  }, []);

  const stopListening = useCallback(()=>{
    document.removeEventListener('mousemove', trackPan);
    document.removeEventListener('mouseup', stopListening);
    document.removeEventListener('touchmove', trackPan);
    document.removeEventListener('touchend', stopListening);
    setIsPanning(false);
  }, [trackPan]);

  const startListening = useCallback((e)=>{
    document.addEventListener('mousemove', trackPan);
    document.addEventListener('mouseup', stopListening);
    document.addEventListener('touchmove', trackPan);
    document.addEventListener('touchend', stopListening);
    setIsPanning(true);
    // Update the ref
    e = e.evt || e;

    lastPoint.current = e.touches ? {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    } : {
      x: e.pageX,
      y: e.pageY
    };
  }, [trackPan, stopListening]);

  return [panPosition, startListening, isPanning];
};

export default usePan;
