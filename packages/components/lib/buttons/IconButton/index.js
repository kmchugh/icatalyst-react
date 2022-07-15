import React from 'react';
import { Tooltip, IconButton as NativeButton } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Icon } from '../../icons/Icon';
const useStyles = makeStyles((theme) => {
    return {
        root: {},
        icon: {},
        iconBtn: ({ size }) => {
            // As we want width and height to be equal same we need to parse size
            const stateSize = {
                inherit: '1.3em',
                small: theme.typography.pxToRem(20 + 8),
                medium: theme.typography.pxToRem(24 + 8),
                large: theme.typography.pxToRem(36 + 8)
            }[size];
            return {
                width: stateSize,
                height: stateSize,
            };
        }
    };
});
export const IconButton = ({ className, title, icon, style, 
// Let Icon sort out the default color
color, size = 'medium', id, ...rest }) => {
    const styles = useStyles({
        size
    });
    return (React.createElement(Tooltip, { title: title || "" },
        React.createElement("span", { id: id, className: clsx(styles.root) },
            React.createElement(NativeButton, { className: clsx(styles.iconBtn, className), "aria-label": title, style: style, ...rest },
                React.createElement(Icon, { size: size, color: color, className: clsx(styles.icon) }, icon)))));
};
