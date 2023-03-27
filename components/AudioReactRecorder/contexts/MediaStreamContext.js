import React, { createContext, useCallback, useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import AudioRecorder from 'audio-recorder-polyfill';
import mpegEncoder from 'audio-recorder-polyfill/wave-encoder';

const MediaStreamContext = createContext({
  stream: undefined,
  url: null,
  isPause: false,
  start: () => {},
  stop: () => {},
  pause: () => {},
  resume: () => {},
});

export const useMediaStream = () => useContext(MediaStreamContext);

export const MediaStreamProvider = ({ children, audio, video }) => {
  const [stream, setStream] = useState();
  const [url, setUrl] = useState();
  const [isPause, setIsPaused] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [isError, setIsError] = useState('');

  // const [audioChunks, setAudioChunks] = useState([]);
  const audioChunks = useRef([]);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.current = [...audioChunks.current, event.data];
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setUrl({
        blob: audioBlob,
        url: audioUrl,
        type: 'audio/wav'
      });
    }
  };
  const start = useCallback(async () => {
    try {
      setIsStop(false);
      setIsError('');
      setUrl(null);
      // AudioRecorder import from audio-recorder-polyfill
      // mpegEncoder import from audio-recorder-polyfill/wave-encoder

      AudioRecorder.encoder = mpegEncoder;
      AudioRecorder.prototype.mimeType = 'audio/x-wav';
      // MediaRecorder = AudioRecorder;
      audioChunks.current = [];
      const mediaStream = await navigator?.mediaDevices?.getUserMedia({ audio, video });
      
      mediaRecorderRef.current = new AudioRecorder(mediaStream);
      mediaRecorderRef.current.addEventListener(
        'dataavailable',
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      setStream(mediaStream);
    } catch (error) {
      console.log('audio error', error);
      alert('Your browser mic permission is block, Please allow mic for recording');
      setIsError('Your browser mic permission is block, Please allow mic for recording');
    }
    
  }, [audio, video]);

  const stop = useCallback(async() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.removeEventListener(
        'dataavailable',
        handleDataAvailable
      );
      setStream(undefined);
      setIsStop(true);
    }
  }, [stream]);

  const pause = () => {
    if (mediaRecorderRef.current) {
      setIsPaused(true);
      mediaRecorderRef.current.pause();
    }
  };

  const resume = () => {
    if (mediaRecorderRef.current) {
      setIsPaused(false);
      mediaRecorderRef.current.resume();
    }
  };

  return (
    <MediaStreamContext.Provider value={{ stream, start, stop, url, pause, resume, isPause, isStop, isError }}>
      {children}
    </MediaStreamContext.Provider>
  );
};

MediaStreamProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  audio: PropTypes.bool,
  video: PropTypes.bool,
};

export default MediaStreamContext;