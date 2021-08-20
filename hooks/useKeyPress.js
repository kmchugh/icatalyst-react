import {useState, useEffect} from 'react';

const useKeyPress = ()=>{
  const [keys, setKeys] = useState([]);

  const handleKeyDown = (e)=>{
    const {key, code} = e;
    setKeys((keys)=>{
      const index = keys.findIndex((i)=>{
        return i.code===code;
      });

      return (index < 0) ?
        [
          ...keys,
          {
            key,
            code
          }
        ] :
        keys;
    });
  };

  const handleKeyUp = (e)=>{
    const {code} = e;
    setKeys((keys)=>{
      const index = keys.findIndex(i=>i.code===code);
      return (index >= 0) ?
        [
          ...keys.slice(0, index),
          ...keys.slice(index+1),
        ] :
        keys;
    });
  };

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return ()=>{
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};

export default useKeyPress;
