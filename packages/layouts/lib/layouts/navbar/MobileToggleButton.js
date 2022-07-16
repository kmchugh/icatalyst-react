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
import { mostReadable, tinycolor } from '@icatalyst/core';
import { makeStyles, useTheme } from '@mui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@icatalyst/components/src/buttons/IconButton';
var useStyles = makeStyles(function ( /*theme*/) {
    return {
        root: {}
    };
});
export var MobileToggleButton = function (_a) {
    var _b;
    var _c = _a.icon, icon = _c === void 0 ? 'menu' : _c, onClick = _a.onClick, rest = __rest(_a, ["icon", "onClick"]);
    var styles = useStyles();
    var theme = useTheme();
    var dispatch = useDispatch();
    // @ts-expect-error
    var layout = useSelector(function (_a) {
        var icatalyst = _a.icatalyst;
        return icatalyst.settings.current.layout;
    });
    var color = ((_b = mostReadable(tinycolor(theme.palette.background.paper), [
        theme.palette.secondary.main,
        theme.palette.primary.main
    ], {})) === null || _b === void 0 ? void 0 : _b.toHex8String()) === 'theme.palette.secondary.main' ? 'secondary' : 'primary';
    return (React.createElement(IconButton, __assign({ onClick: function (e) {
            onClick && (onClick(e, !layout.navbar.folded));
            // TODO : Use the correct action here
            return dispatch({
                type: 'test action',
                payload: 'test payload'
            });
        }, icon: icon, disableRipple: true, color: color }, rest)));
};
