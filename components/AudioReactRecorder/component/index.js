import React, { createRef, useEffect, useState } from 'react';
import { useAudioAnalyser } from '../contexts/AudioAnalyserContext';
import PropTypes from 'prop-types';
import { useMediaStream } from '../contexts/MediaStreamContext';

export const RecordState = Object.freeze({
  START: 'start',
  PAUSE: 'pause',
  STOP: 'stop',
  NONE: 'none'
});

const AudioVisualizer = ({ state, onStop, onError, foregroundColor, ...props }) => {
  const canvasRef = createRef();
  // Getting Analyser data from context
  const { analyser } = useAudioAnalyser();
  // Getting Function and State data from media stream context
  const { start, stop, pause, resume, isPause, isStop, isError, url } = useMediaStream();
  const [wave, setWave] = useState(false);

  useEffect(() => {
    if(isStop && onStop && url && state === RecordState.STOP) {
      onStop(url);
    }
  }, [isStop, url]);

  useEffect(() => {
    if(isError && onError ) {
      onError(isError);
    }
  }, [isError]);

  useEffect(() => {
    if (!analyser) {
      return;
    }

    let raf;
    // Need to check
    const data = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(data);
      const canvas = canvasRef.current;
      if (canvas && wave) {
        const { height, width } = canvas;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0) / data.length;

        if (context) {
          context.lineWidth = 2;
          context.strokeStyle = foregroundColor || '#fff';
          context.clearRect(0, 0, width, height);

          context.beginPath();
          context.moveTo(0, height / 2);
          for (const item of data) {
            const y = (item / 255.0) * height;
            context.lineTo(x, y);
            x += sliceWidth;
          }
          context.lineTo(x, height / 2);
          context.stroke();
        }
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [canvasRef, analyser]);

  const  doIfState = (stateData, cb) => {
    if (state == stateData) {
      cb && cb();
    }
  };

  useEffect(() => {
    switch (state) {
    case RecordState.START:
      if (isPause) {
        doIfState(RecordState.START, resume);
      } else {
        doIfState(RecordState.START, start);
      }
      setWave(true);
      break;
    case RecordState.PAUSE:
      // doIfState(RecordState.START, resume);
      doIfState(RecordState.PAUSE, pause);
      setWave(false);
      break;
    case RecordState.STOP:
      doIfState(RecordState.STOP, stop);
      setWave(false);
      // onStop(url);
      break;
    default:
      doIfState(RecordState.START, start);
      setWave(true);
      break;
    }
  }, [state]);

  return (
    <div className='audio-react-recorder'>
      <canvas className="audio-react-recorder__canvas" ref={canvasRef} {...props} />
    </div>
  );
};

AudioVisualizer.propTypes = {
  foregroundColor: PropTypes.string,
  state: PropTypes.string,
  onStop: PropTypes.func,
  onError: PropTypes.func,
};

export default AudioVisualizer;
