import { Button as NativeButton, ButtonProps as NativeProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import Icon from '../../icons/Icon';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
        }
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonProps extends Omit<NativeProps, 'startIcon' | 'endIcon'> {
    /**
     * The icon to display.
     */
    icon?: string,
    /**
     * The positioning of the icon
     */
    iconPosition?: 'start' | 'end',
}

export function Button({
    className,
    children,
    variant = 'contained',
    icon,
    iconPosition = 'start',
    style,
    color = 'primary',
    size = 'medium',
    ...rest
}: ButtonProps) {
    const styles = useStyles();

    return (
        <NativeButton
            className={clsx(styles.root, className)}
            style={style}
            variant={variant}
            color={color}
            size={size}
            startIcon={
                (icon && iconPosition === 'start') && (
                    <Icon>{icon}</Icon>
                )
            }
            endIcon={
                (icon && iconPosition === 'end') && (
                    <Icon>{icon}</Icon>
                )
            }
            {...rest}
        >
            {children}
        </NativeButton>
    );
}

export default Button;