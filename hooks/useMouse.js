import {useState, useEffect} from 'react';

const ORIGIN = Object.freeze({x: 0, y:0});

const useMouse = (ref)=>{

  const [position, setPosition] = useState(ORIGIN);

  const handleMouseMove = (e)=>{
    setPosition({
      x: e.x,
      y: e.y,
      screenX: e.screenX,
      screenY: e.screenY,
      pageX: e.pageX,
      pageY: e.pageY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      layerX: e.layerX,
      layerY: e.layerY,
    });
  };

  // Set up the listeners when the element is available
  useEffect(()=>{
    if (ref && ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove);
      return ()=>{
        ref.current.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [ref]);

  return [position];
};

export default useMouse;
