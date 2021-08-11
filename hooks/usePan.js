import {useState, useRef, useCallback} from 'react';

const ORIGIN = Object.freeze({x: 0, y:0});

const usePan = ()=>{
  const [panPosition, setPanPosition] = useState(ORIGIN);

  // UseRef for ease of access
  const lastPoint = useRef(ORIGIN);

  const trackPan = useCallback((e)=>{
    const prevPoint = lastPoint.current;

    var scale = e.target.getBoundingClientRect().width / e.target.offsetWidth;
    const appliedMultiplier = scale < .39 ? 10*(1-scale) : 1;

    const currentPoint = {
      x: e.pageX,
      y: e.pageY
    };
    lastPoint.current = currentPoint;

    setPanPosition((state)=>{
      return {
        x: state.x + ((prevPoint.x - currentPoint.x) * appliedMultiplier),
        y: state.y + ((prevPoint.y - currentPoint.y) * appliedMultiplier)
      };
    });

  }, []);

  const stopListening = useCallback(()=>{
    document.removeEventListener('mousemove', trackPan);
    document.removeEventListener('mouseup', stopListening);
  }, [trackPan]);

  const startListening = useCallback((e)=>{
    document.addEventListener('mousemove', trackPan);
    document.addEventListener('mouseup', stopListening);
    // Update the ref
    lastPoint.current = {
      x: e.pageX,
      y: e.pageY
    };
  }, trackPan, stopListening);



  return [panPosition, startListening];
};

export default usePan;
