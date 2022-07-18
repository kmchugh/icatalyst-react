import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
var useStyles = makeStyles(function (theme) {
    return {
        root: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            padding: theme.spacing(3),
            boxSizing: 'border-box'
        },
        contentAlignFn: function (_a) {
            var verticalAlign = _a.verticalAlign, horizontalAlign = _a.horizontalAlign;
            var vertical = {
                top: 'flex-start',
                center: 'center',
                bottom: 'flex-end'
            };
            var horizontal = {
                left: 'flex-start',
                center: 'center',
                right: 'flex-end'
            };
            return {
                justifyContent: vertical[verticalAlign],
                alignItems: horizontal[horizontalAlign]
            };
        }
    };
});
export var BaseContainer = function (_a) {
    var className = _a.className, style = _a.style, children = _a.children, _b = _a.verticalAlign, verticalAlign = _b === void 0 ? 'top' : _b, _c = _a.horizontalAlign, horizontalAlign = _c === void 0 ? 'left' : _c;
    var styles = useStyles({
        verticalAlign: verticalAlign,
        horizontalAlign: horizontalAlign
    });
    return (React.createElement("div", { className: clsx(styles.root, styles.contentAlignFn, className), style: style }, children));
};
