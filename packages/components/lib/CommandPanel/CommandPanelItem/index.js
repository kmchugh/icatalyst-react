import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
var useStyles = makeStyles(function (theme) {
    return {
        root: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        }
    };
});
export var CommandPanelItem = function (_a) {
    var _b = _a.style, style = _b === void 0 ? {} : _b, className = _a.className, children = _a.children;
    var styles = useStyles();
    return (React.createElement("div", { className: clsx(styles.root, className), style: style }, children));
};
