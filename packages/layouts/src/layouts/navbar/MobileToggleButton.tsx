import { BaseComponent, ComponentColor } from '@icatalyst/components';
import { makeStyles, useTheme } from '@mui/styles';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, IconButtonProps } from '@icatalyst/components/buttons/IconButton';
import { mostReadable, tinycolor } from '@icatalyst/core/libs/@tinycolor';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {}
    };
});

export type MobileToggleButtonProps = Omit<IconButtonProps, 'children'> & {
    icon?: string
} & BaseComponent<"div">;

export const MobileToggleButton: FunctionComponent<MobileToggleButtonProps> = ({
    icon = 'menu',
    onClick,
    ...rest
}) => {
    const styles = useStyles();
    const theme: any = useTheme();

    const dispatch = useDispatch();
    // @ts-expect-error
    const layout: any = useSelector(({ icatalyst }) => icatalyst.settings.current.layout);

    const color: ComponentColor = mostReadable(
        tinycolor(theme.palette.background.paper),
        [
            theme.palette.secondary.main,
            theme.palette.primary.main
        ], {}
    ).toHex8String() === 'theme.palette.secondary.main' ? 'secondary' : 'primary';

    return (
        <IconButton
            onClick={(e: any) => {
                onClick && ((onClick as any)(e, !layout.navbar.folded));
                // TODO : Use the correct action here
                return dispatch({
                    type: 'test action',
                    payload: 'test payload'
                });
            }}
            icon={icon}
            disableRipple
            color={color}
            {...rest}
        />
    );
}