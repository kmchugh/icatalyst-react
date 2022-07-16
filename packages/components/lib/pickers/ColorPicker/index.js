var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ColorPicker as NativeComponent, createColor } from 'material-ui-color';
var useStyles = makeStyles(function ( /*theme*/) {
    return {
        root: {}
    };
});
export var ColorPicker = function (_a) {
    var className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.value, value = _c === void 0 ? null : _c, onChange = _a.onChange, _d = _a.hideTextfield, hideTextfield = _d === void 0 ? false : _d, _e = _a.defaultColor, defaultColor = _e === void 0 ? null : _e;
    var styles = useStyles();
    var _f = useState(), colorValue = _f[0], setColorValue = _f[1];
    var handleChange = function (color) {
        if (color === void 0) { color = null; }
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
        if (value !== color && value !== "#".concat(color === null || color === void 0 ? void 0 : color.hex)) {
            // @ts-expect-error
            onChange && onChange(color ? "#".concat(color === null || color === void 0 ? void 0 : color.hex) : null);
        }
    };
    useEffect(function () {
        // @ts-expect-error
        handleChange(value);
    }, [value]);
    return (React.createElement("div", { className: clsx(styles.root, className), style: __assign({}, style) },
        React.createElement(NativeComponent, { hideTextfield: hideTextfield, 
            // @ts-expect-error
            defaultValue: defaultColor, 
            //className={clsx(styles.colorPicker)}
            // @ts-expect-error
            onChange: handleChange, value: colorValue })));
};
