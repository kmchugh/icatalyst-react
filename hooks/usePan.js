import {useState, useRef, useCallback} from 'react';

const ORIGIN = Object.freeze({x: 0, y:0});

const usePan = ()=>{
  const [panPosition, setPanPosition] = useState(ORIGIN);
  const [isPanning, setIsPanning] = useState(false);

  // UseRef for ease of access
  const lastPoint = useRef(ORIGIN);

  const trackPan = useCallback((e)=>{
    const prevPoint = lastPoint.current;

    const currentPoint = {
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
    setIsPanning(false);
  }, [trackPan]);

  const startListening = useCallback((e)=>{
    document.addEventListener('mousemove', trackPan);
    document.addEventListener('mouseup', stopListening);
    setIsPanning(true);
    // Update the ref
    lastPoint.current = {
      x: e.pageX,
      y: e.pageY
    };
  }, [trackPan, stopListening]);

  return [panPosition, startListening, isPanning];
};

export default usePan;
