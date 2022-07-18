import {useState, useEffect} from 'react';

const ORIGIN = Object.freeze({
  x: 0,
  y: 0,
  screenX: 0,
  screenY: 0,
  pageX: 0,
  pageY: 0,
  offsetX: 0,
  offsetY: 0,
  clientX : 0,
  clientY : 0
});

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
      offsetX: e.offsetX || e.layerX,
      offsetY: e.offsetY || e.layerX,
      clientX : e.clientX,
      clientY : e.clientY
    });
  };

  // Set up the listeners when the element is available
  useEffect(()=>{
    if (ref && ref.current) {
      const element = ref.current;
      element.addEventListener('mousemove', handleMouseMove);
      return ()=>{
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [ref]);

  return [position];
};

export default useMouse;
