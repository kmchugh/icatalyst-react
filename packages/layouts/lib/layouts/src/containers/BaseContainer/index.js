import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            padding: theme.spacing(3)
        },
        contentAlignFn: ({ verticalAlign, horizontalAlign }) => {
            const vertical = {
                top: 'flex-start',
                center: 'center',
                bottom: 'flex-end'
            }[verticalAlign];
            const horizontal = {
                left: 'flex-start',
                center: 'center',
                right: 'flex-end'
            }[horizontalAlign];
            return {
                justifyContent: vertical,
                alignItems: horizontal
            };
        }
    };
});
export const BaseContainer = ({ className, style, children, verticalAlign = 'top', horizontalAlign = 'left', }) => {
    const styles = useStyles({
        verticalAlign,
        horizontalAlign
    });
    return (React.createElement("div", { className: clsx(styles.root, styles.contentAlignFn, className), style: style }, children));
};
