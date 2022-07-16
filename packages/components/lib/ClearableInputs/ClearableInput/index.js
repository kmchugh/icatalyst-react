import { Input, InputAdornment, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconButton from 'buttons/IconButton';
import Icon from 'icons/Icon';
import React from 'react';
import clsx from 'clsx';
var useStyles = makeStyles(function (theme) {
    return {
        root: {
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex'
        },
    };
});
export var Clearableinput = function (_a) {
    var _b = _a.icon, icon = _b === void 0 ? 'create' : _b, _c = _a.label, label = _c === void 0 ? 'input' : _c, value = _a.value, color = _a.color, style = _a.style, _d = _a.disply, disply = _d === void 0 ? 'flex' : _d, _e = _a.size, size = _e === void 0 ? 'medium' : _e, className = _a.className;
    var styles = useStyles();
    return (React.createElement(Paper, { className: clsx(styles.root, className), style: style, elevation: 1 }, React.createElement(Input, { placeholder: label, className: clsx(styles.root, className), disableUnderline: true, fullWidth: true, value: value || '', inputProps: {
            'aria-label': label
        }, 
        //   onChange={(e)=>{
        //     onChange && onChange(e.target.value);
        //   }}
        startAdornment: React.createElement(InputAdornment, { position: "start" },
            React.createElement(Icon, { color: color }, icon)), endAdornment: value && React.createElement(InputAdornment, { position: "end" },
            React.createElement(IconButton, { size: size, icon: "cancel", title: "clear", disabled: !value || value === '' })) })));
};
