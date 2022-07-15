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
      // @ts-expect-error
      setColorValue(color);
    } else {
      // @ts-expect-error
      if (!color.raw) {
        // @ts-expect-error
        color = createColor(color);
      }
      // @ts-expect-error
      if (!color.error) {
        // @ts-expect-error
        setColorValue(color);
      }
    }
    // @ts-expect-error
    if (value !== color && value !== `#${color?.hex}`) {
      // @ts-expect-error
      onChange && onChange(color ? `#${color?.hex}` : null);
    }
  };

  useEffect(() => {
    // @ts-expect-error
    handleChange(value);
  }, [value]);
  return (
    <div
      className={clsx(styles.root, className)}
      style={{ ...style }}
    >
      <NativeComponent
        hideTextfield={hideTextfield}
        // @ts-expect-error
        defaultValue={defaultColor}
        //className={clsx(styles.colorPicker)}
        // @ts-expect-error
        onChange={handleChange}
        value={colorValue}
      />
    </div>

  )


}


