import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ColorPicker as NativeComponent, createColor } from 'material-ui-color';
const useStyles = makeStyles(( /*theme*/) => {
    return {
        root: {}
    };
});
export const ColorPicker = ({ className, style = {}, value = null, onChange, hideTextfield = false, defaultColor = null }) => {
    const styles = useStyles();
    const [colorValue, setColorValue] = useState();
    const handleChange = (color = null) => {
        if (!color) {
            setColorValue(color);
        }
        else {
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
    return (React.createElement("div", { className: clsx(styles.root, className), style: { ...style } },
        React.createElement(NativeComponent, { hideTextfield: hideTextfield, defaultValue: defaultColor, 
            //className={clsx(styles.colorPicker)}
            onChange: handleChange, value: colorValue })));
};
