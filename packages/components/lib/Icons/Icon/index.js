import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import MUIIcon from '@mui/material/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// TODO: https://mui.com/material-ui/customization/theming/#custom-variables
const useStyles = makeStyles((theme) => {
    return {
        root: {},
        sizeFn: ({ size }) => {
            const sizes = {
                inherit: 'inherit',
                small: theme.typography.pxToRem(20),
                medium: theme.typography.pxToRem(20),
                large: theme.typography.pxToRem(20),
            };
            return {
                fontSize: sizes[size]
            };
        },
        colorFn: ({ color }) => {
            const colors = {
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
export const Icon = ({ className, style, sx, children = 'fa question', color = 'inherit', size = 'medium' }) => {
    const styles = useStyles({
        size,
        color
    });
    if (children.startsWith('fa ')) {
        const faType = children.substring(3).split(' ', 2);
        if (faType.length === 1) {
            faType.unshift('fas');
        }
        const faIcon = faType;
        return (React.createElement(FontAwesomeIcon, { className: clsx(styles.root, styles.sizeFn, styles.colorFn, className), icon: faIcon, style: style }));
    }
    else {
        return (React.createElement(MUIIcon, { className: clsx(styles.root, className), style: style, color: color, fontSize: size, sx: sx }, children));
    }
};
