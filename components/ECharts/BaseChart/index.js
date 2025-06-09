import React, {forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/styles';
import clsx from 'clsx';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import { useResizeDetector } from 'react-resize-detector';
import useDebounce from '@icatalyst/hooks/fuse/useDebounce';


const Root = styled('div')({
  height: '100%',
  width: '100%',
  overflow: 'hidden'
});
const ReactEchartsCoreStyle = styled(ReactEchartsCore)({
  height: '100%',
  width: '100%',
  overflow: 'hidden'
})

const BaseChart = forwardRef(({
  className,
  style,
  debounce = 200,
  ...rest
}, ref)=>{
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
    <Root
      ref={containerRef}
    >
      {(renderChart && dimensions) && <ReactEchartsCoreStyle
        {...rest}
        className={clsx(className)}
        style={{
          height: `${dimensions.height}px`,
          width: `${dimensions.width}px`,
          ...style
        }}
        ref={ref}
      />
      }
    </Root>
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
