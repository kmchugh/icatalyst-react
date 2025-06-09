import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {ColorPicker as NativeComponent, createColor } from 'material-ui-color';
import { styled } from '@mui/styles';

const Root = styled('div')({

});

const ColorPicker = ({
  className,
  style = {},
  value = null,
  onChange,
  hideTextfield = false,
  defaultColor = null
})=>{
  const [colorValue, setColorValue] = useState();

  const handleChange = (color = null)=>{
    if (!color) {
      setColorValue(color);
    } else {
      if (!color.raw) {
        color = createColor(color);
      }
      if (!color.error) {
        setColorValue(color);
      }
    }
    if (value !== color && value !== `#${color?.hex}`) {
      onChange && onChange(color ? `#${color?.hex}` : null);
    }
  };

  useEffect(()=>{
    handleChange(value);
  }, [value]);

  return (
    <Root
      className={clsx(className)}
      style={{...style}}
    >
      <NativeComponent
        hideTextfield={hideTextfield}
        defaultValue={defaultColor}
        onChange={handleChange}
        value={colorValue}
      />
    </Root>
  );
};

ColorPicker.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  value : PropTypes.string,
  onChange : PropTypes.func,
  hideTextfield : PropTypes.bool,
  defaultColor : PropTypes.string
};

export default ColorPicker;
