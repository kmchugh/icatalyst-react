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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { IconButton as NativeButton, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import Icon from 'icons/Icon';
var useStyles = makeStyles(function (theme) {
    return {
        root: {},
        icon: {},
        iconBtn: function (_a) {
            var size = _a.size;
            // As we want width and height to be equal same we need to parse size
            var sizes = {
                inherit: '1.3em',
                small: theme.typography.pxToRem(20 + 8),
                medium: theme.typography.pxToRem(24 + 8),
                large: theme.typography.pxToRem(36 + 8)
            };
            return {
                width: sizes[size],
                height: sizes[size],
            };
        }
    };
});
var IconButton = function (_a) {
    var className = _a.className, title = _a.title, icon = _a.icon, style = _a.style, 
    // Let Icon sort out the default color
    color = _a.color, _b = _a.size, size = _b === void 0 ? 'medium' : _b, id = _a.id, rest = __rest(_a, ["className", "title", "icon", "style", "color", "size", "id"]);
    var styles = useStyles({
        size: size
    });
    return (React.createElement(Tooltip, { title: title || "" },
        React.createElement("span", { id: id, className: clsx(styles.root) },
            React.createElement(NativeButton, __assign({ className: clsx(styles.iconBtn, className), "aria-label": title, style: style }, rest),
                React.createElement(Icon, { size: size, color: color, className: clsx(styles.icon) }, icon)))));
};
export default IconButton;
