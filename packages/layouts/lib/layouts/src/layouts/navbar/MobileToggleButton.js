import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
// TODO : Should not be /lib;
import { IconButton } from '@icatalyst/components/lib/buttons/IconButton';
import { mostReadable, tinycolor } from '@icatalyst/core/lib/libs/@tinycolor';
const useStyles = makeStyles(( /*theme*/) => {
    return {
        root: {}
    };
});
export const MobileToggleButton = ({ icon = 'menu', onClick, ...rest }) => {
    const styles = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const layout = useSelector(({ icatalyst }) => icatalyst.settings.current.layout);
    const color = mostReadable(tinycolor(theme.palette.background.paper), [
        theme.palette.secondary.main,
        theme.palette.primary.main
    ], {}).toHex8String() === 'theme.palette.secondary.main' ? 'secondary' : 'primary';
    return (React.createElement(IconButton, { onClick: (e) => {
            onClick && (onClick(e, !layout.navbar.folded));
            // TODO : Use the correct action here
            return dispatch({
                type: 'test action',
                payload: 'test payload'
            });
        }, icon: icon, disableRipple: true, color: color, ...rest }));
};
