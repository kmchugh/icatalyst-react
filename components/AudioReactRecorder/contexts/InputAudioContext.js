import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useMediaStream } from './MediaStreamContext';
import PropTypes from 'prop-types';

const InputAudioContext = createContext({
  audioCtx: undefined,
  source: undefined,
});

export const useInputAudio = () => useContext(InputAudioContext);

export const InputAudioProvider = ({ children }) => {
  const [context, setContext] = useState();
  const [source, setSource] = useState();
  const { stream } = useMediaStream();

  const stop = useCallback(async () => {
    try {
      // if (context) {
      //   await context.close().then((res) => {
      //     console.log(res, context);
      //     setContext(undefined);
      //   });
      // }
      if (source) {
        source.disconnect();
        setSource(undefined);
      }
    } catch(e) {
      console.error(e.name, e.message);
    }
  }, [context, source]);

  useEffect(() => {
    if (stream) {
      // New audioCtx
      const audioCtx = new AudioContext();
      setSource(audioCtx?.createMediaStreamSource(stream));
      setContext(audioCtx);
    }
  }, [stream]);

  useEffect(() => {
    if (!stream) {
      stop();
    }

    return () => {
      stop();
    };
  }, [stream, stop]);

  return (
    <InputAudioContext.Provider value={{ audioCtx: context, source }}>
      {children}
    </InputAudioContext.Provider>
  );
};

InputAudioProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default InputAudioContext;