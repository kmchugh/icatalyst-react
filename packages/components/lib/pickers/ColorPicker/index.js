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
            // @ts-expect-error
            setColorValue(color);
        }
        else {
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
    return (React.createElement("div", { className: clsx(styles.root, className), style: { ...style } },
        React.createElement(NativeComponent, { hideTextfield: hideTextfield, 
            // @ts-expect-error
            defaultValue: defaultColor, 
            //className={clsx(styles.colorPicker)}
            // @ts-expect-error
            onChange: handleChange, value: colorValue })));
};
