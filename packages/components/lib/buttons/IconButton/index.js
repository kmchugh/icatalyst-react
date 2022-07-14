import React from 'react';
import { Tooltip, IconButton as NativeButton, Icon } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => {
    return {
        root: {},
        // @ts-expect-error
        iconBtn: ({ size }) => {
            const StateSize = {
                inherit: 'inherit',
                small: theme.typography.pxToRem(20),
                medium: theme.typography.pxToRem(24),
                large: theme.typography.pxToRem(36)
            }[size];
            return {
                fontSize: StateSize
            };
        },
        // @ts-expect-error  
        colorFn: ({ color }) => {
            const stateColour = {
                primary: theme.palette.primary.main,
                secondary: theme.palette.secondary.main,
                info: theme.palette.info.main,
                success: theme.palette.success.main,
                warning: theme.palette.warning.main,
                action: theme.palette.action.active,
                error: theme.palette.error.main,
                disabled: theme.palette.action.disabled,
                inherit: undefined
            }[color];
            return {
                color: stateColour
            };
        }
    };
});
export const IconButton = ({ className, title, icon, style, 
//  onClick,
color = 'inherit', size = 'medium', id }) => {
    const styles = useStyles({
        size,
        color
    });
    return (React.createElement(Tooltip, { title: title || "" },
        React.createElement("span", { id: id, className: clsx(styles.root) },
            React.createElement(NativeButton, { className: clsx(styles.root, styles.colorFn, styles.iconBtn, className), "aria-label": title, style: style },
                React.createElement(Icon, { className: clsx(styles.root, styles.iconBtn, className) }, icon)))));
};
