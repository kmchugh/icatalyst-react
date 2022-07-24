import { IconButton as NativeButton, IconButtonProps as NativeProps, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import Icon from '../../icons/Icon';

import { ComponentColor, ComponentSize } from '../../types';

type StyleProps = {
    size: ComponentSize,
    color: ComponentColor
};

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
        },
        icon: {},
        iconBtn: ({ size }: StyleProps) => {
            // As we want width and height to be equal same we need to parse size
            const sizes: {
                [key: string]: string
            } = {
                inherit: '1.3em',
                small: theme.typography.pxToRem(20 + 8),
                medium: theme.typography.pxToRem(24 + 8),
                large: theme.typography.pxToRem(36 + 8)
            };

            return {
                width: sizes[size],
                height: sizes[size],
            };
        },
        root_text: ({ color }: StyleProps) => {
            return {
                color: theme.palette[color]?.main
            };
        },
        root_contained: ({ color }: StyleProps) => {

            const palettePosition = (
                color === 'action' && {
                    main: theme.palette.action.active
                }
            ) ||
                (
                    color === 'disabled' && {
                        main: theme.palette.action.disabled
                    }
                ) ||
                theme.palette[color];

            return {
                backgroundColor: palettePosition?.main,
                color: palettePosition?.contrastText
            };
        },
        root_outlined: ({ color }: StyleProps) => {
            return {
                borderWidth: 'thin',
                borderStyle: 'solid',
                borderColor: theme.palette[color]?.main,
                color: theme.palette[color]?.main
            };
        },
    };
});

export interface IconButtonProps extends Omit<NativeProps, 'size' | 'color' | 'title' | 'icon'> {
    /**
     * The text provided here is used as both the tooltip and the aria-label
     */
    title?: string,
    /**
     * Specify the color of the icon
     */
    color?: ComponentColor,
    /**
     * The size of the control
     */
    size?: ComponentSize,
    /**
     * The icon to display.
     */
    icon?: string,
    /**
     * The variant of the button
     */
    variant?: 'text' | 'contained' | 'outlined';
}

export function IconButton({
    className,
    title,
    icon,
    style,
    color = 'primary',
    size = 'medium',
    variant = 'text',
    id,
    ...rest
}: IconButtonProps) {
    const styles = useStyles({
        size,
        color
    });

    return (
        <Tooltip title={title || ""}>
            {
                // Span is required here for the tooltip to work correctly 
            }
            <span
                id={id}
                className={clsx(styles.root)}
            >
                <NativeButton
                    className={clsx(styles.iconBtn, styles[`root_${variant}`], className)}
                    aria-label={title}
                    style={style}
                    {...rest}
                >
                    <Icon
                        size={size}
                        color="inherit"
                        className={clsx(styles.icon)}
                    >{icon}</Icon>
                </NativeButton>
            </span>
        </Tooltip>
    );
}

export default IconButton;






