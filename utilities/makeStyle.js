import { useTheme } from '@mui/material';
import { css, cx } from '@emotion/css';

const createMuiStyles = (stylesFn) => {
  return (props = {}) => {
    const theme = useTheme();
    const rawStyles = stylesFn(theme, props);

    // Convert each style object to an Emotion class
    const classes = Object.keys(rawStyles).reduce((acc, key) => {
      acc[key] = css(rawStyles[key]);
      return acc;
    }, {});

    return classes;
  };
};

// Utility function to combine multiple class names
const cxMui = (...args) => cx(...args);

const useMergedMuiStyles = (useGeneratedStyles, props = {}) => {
  const generated = useGeneratedStyles(props);
  const passedClasses = props.classes || {};

  const merged = Object.keys(generated).reduce((acc, key) => {
    acc[key] = cx(generated[key], passedClasses[key]);
    return acc;
  }, {});

  return merged;
};

export { createMuiStyles, cxMui, useTheme as useMuiTheme, useMergedMuiStyles };