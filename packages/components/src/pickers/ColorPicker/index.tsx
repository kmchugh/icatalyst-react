import React, { FunctionComponent, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ColorPicker as NativeComponent, createColor } from 'material-ui-color';
import { BaseComponent } from '../../types';

const useStyles = makeStyles((/*theme*/) => {
  return {
    root: {}
  };
});

export type ColorPickerProps = {
  style?: object,
  value?: string,
  onChange?: Function,
  hideTextfield?: boolean,
  defaultColor?: string
} & BaseComponent<"div">;

export const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  className,
  style = {},
  value = null,
  onChange,
  hideTextfield = false,
  defaultColor = null

}) => {
  const styles = useStyles()
  const [colorValue, setColorValue] = useState();

  const handleChange = (color = null) => {
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
      // @ts-expect-error
      onChange && onChange(color ? `#${color?.hex}` : null);
    }
  };

  useEffect(() => {
    handleChange(value);
  }, [value]);
  return (
    <div
      className={clsx(styles.root, className)}
      style={{ ...style }}
    >
      <NativeComponent
        hideTextfield={hideTextfield}
        defaultValue={defaultColor}
        //className={clsx(styles.colorPicker)}
        onChange={handleChange}
        value={colorValue}
      />
    </div>

  )


}


