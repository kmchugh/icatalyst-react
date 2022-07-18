import React, {forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { useResizeDetector } from 'react-resize-detector';
import useDebounce from 'icatalyst/hooks/fuse/useDebounce';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {
      height: '100%',
      width: '100%',
      overflow: 'hidden'
    }
  };
});

const BaseChart = forwardRef(({
  className,
  style,
  debounce = 200,
  ...rest
}, ref)=>{
  const styles = useStyles();
  const [renderChart, setRenderChart] = useState(false);
  const [dimensions, setDimensions] = useState(null);

  const updateDimensions = useDebounce((dimensions)=>{
    setDimensions(dimensions);
  }, debounce);

  const { width, height, ref : containerRef } = useResizeDetector();

  useEffect(()=>{
    if (width > 0 && height > 0) {
      if (dimensions?.height !== height || dimensions?.width !== width) {
        updateDimensions({
          height : height,
          width: width
        });
      }
      setRenderChart(true);
    }
  }, [width, height]);

  return (
    <div
      className={clsx(styles.root)}
      ref={containerRef}
    >
      {(renderChart && dimensions) && <ReactEchartsCore
        {...rest}
        className={clsx(styles.root, className)}
        style={{
          height: `${dimensions.height}px`,
          width: `${dimensions.width}px`,
          ...style
        }}
        ref={ref}
      />
      }
    </div>
  );
});

BaseChart.displayName = 'BaseChart';
BaseChart.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  debounce : PropTypes.number
};

export default BaseChart;
