import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import MUIIcon from '@mui/material/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// TODO: https://mui.com/material-ui/customization/theming/#custom-variables
var useStyles = makeStyles(function (theme) {
    return {
        root: {},
        sizeFn: function (_a) {
            var size = _a.size;
            var sizes = {
                inherit: 'inherit',
                small: theme.typography.pxToRem(20),
                medium: theme.typography.pxToRem(20),
                large: theme.typography.pxToRem(20),
            };
            return {
                fontSize: sizes[size]
            };
        },
        colorFn: function (_a) {
            var color = _a.color;
            var colors = {
                primary: theme.palette.primary.main,
                secondary: theme.palette.secondary.main,
                info: theme.palette.info.main,
                success: theme.palette.success.main,
                warning: theme.palette.warning.main,
                action: theme.palette.action.active,
                error: theme.palette.error.main,
                disabled: theme.palette.action.disabled,
                inherit: undefined
            };
            return {
                color: colors[color]
            };
        }
    };
});
var Icon = function (_a) {
    var className = _a.className, style = _a.style, sx = _a.sx, _b = _a.children, children = _b === void 0 ? 'fa question' : _b, _c = _a.color, color = _c === void 0 ? 'inherit' : _c, _d = _a.size, size = _d === void 0 ? 'medium' : _d;
    var styles = useStyles({
        size: size,
        color: color
    });
    if (children.startsWith('fa ')) {
        var faType = children.substring(3).split(' ', 2);
        if (faType.length === 1) {
            faType.unshift('fas');
        }
        var faIcon = faType;
        return (React.createElement(FontAwesomeIcon, { className: clsx(styles.root, styles.sizeFn, styles.colorFn, className), icon: faIcon, style: style }));
    }
    else {
        return (React.createElement(MUIIcon, { className: clsx(styles.root, className), style: style, color: color, fontSize: size, sx: sx }, children));
    }
};
export default Icon;
