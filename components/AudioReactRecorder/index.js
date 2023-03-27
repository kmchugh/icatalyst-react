import React from 'react';
import { AudioAnalyserProvider } from './contexts/AudioAnalyserContext';
import { MediaStreamProvider } from './contexts/MediaStreamContext';
import { InputAudioProvider } from './contexts/InputAudioContext';
import AudioVisualizer from './component';

export const RecordState = Object.freeze({
  START: 'start',
  PAUSE: 'pause',
  STOP: 'stop',
  NONE: 'none'
});

const AudioReactRecorder = (props) => {
  return (
    <MediaStreamProvider video={false} audio={true}>
      <InputAudioProvider>
        <AudioAnalyserProvider>
          <AudioVisualizer {...props}/>
        </AudioAnalyserProvider>
      </InputAudioProvider>
    </MediaStreamProvider>
  );
};

export default AudioReactRecorder;
