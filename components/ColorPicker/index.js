import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ColorPicker as NativeComponent, createColor } from 'material-ui-color';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const ColorPicker = ({
  className,
  style = {},
  value = null,
  onChange,
  hideTextfield = false,
  defaultColor = null
})=>{
  const styles = useStyles();
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
    <div
      className={cxMui(styles.root, className)}
      style={{...style}}
    >
      <NativeComponent
        hideTextfield={hideTextfield}
        defaultValue={defaultColor}
        className={cxMui(styles.colorPicker)}
        onChange={handleChange}
        value={colorValue}
      />
    </div>
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
