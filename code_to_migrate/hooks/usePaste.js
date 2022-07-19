import {useEffect, useRef} from 'react';
import _ from '../@lodash';

const defaultSettings = {
  allowPaste : true,
  onPaste(e){
    console.warn('paste function not provided', e);
  }
};

const usePaste = (config)=>{
  const {
    allowPaste,
    onPaste
  } = _.merge({}, defaultSettings, config);

  const canPaste = useRef(allowPaste);

  const setAllowPaste = (value)=>{
    canPaste.current = Boolean(value);
  };

  useEffect(()=>{
    if (canPaste.current) {
      window.addEventListener('paste', onPaste);
    } else {
      window.removeEventListener('paste', onPaste);
    }

    return ()=>{
      window.removeEventListener('paste', onPaste);
    };
  }, [canPaste.current]);

  return [canPaste.current, setAllowPaste];
};

export default usePaste;
