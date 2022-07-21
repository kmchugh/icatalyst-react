import { mostReadable, tinycolor } from '@icatalyst/react/core';
import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { BaseComponent, ComponentColor } from '../../types';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            alignSelf: 'center',
            height: '100%',
            display: 'flex',
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        },
        title: {
            marginBottom: theme.spacing(2)
        },
        linearProgress: {
            marginBottom: theme.spacing(4),
            width: theme.breakpoints.values.sm
        },
        circularProgress: {
            marginBottom: theme.spacing(4),
        }
    };
});

export type LoaderColorProp = Exclude<ComponentColor, 'action' | 'disabled'>;

export interface LoaderProps extends BaseComponent<'span'> {
    title?: string;
    color?: LoaderColorProp;
    variant?: 'linear' | 'circular';
    minValue?: number,
    maxValue?: number,
    value?: number
}

export function Loader({
    className,
    style,
    title,
    id,
    color = 'primary',
    variant = 'linear',
    minValue = 0,
    maxValue = 100,
    value
}: LoaderProps) {
    const styles = useStyles();

    const theme: any = useTheme();

    const normalizedValue = (value === undefined || value === null) ?
        value :
        (((value - minValue) * 100) / (maxValue - minValue));

    const progressVariant = (value === undefined || value === null) ?
        'indeterminate' :
        'determinate';

    color = color || (mostReadable(
        tinycolor(theme.palette.background.paper),
        [
            theme.palette.primary.main,
            theme.palette.secondary.main,
        ]
    )?.toHex8String() === theme.palette.primary.main ? 'primary' : 'secondary');

    return (
        <div
            className={clsx(styles.root, className)}
            style={style}
        >
            {title && (
                <Typography
                    className={clsx(styles.title)}
                    color="textSecondary"
                    variant="h6"
                >
                    {title}
                </Typography>
            )}

            {variant === 'linear' && (
                <LinearProgress
                    className={clsx(styles.linearProgress)}
                    aria-label={title}
                    id={id}
                    color={color}
                    value={normalizedValue}
                    variant={progressVariant}
                />
            )}

            {variant === 'circular' && (
                <CircularProgress
                    className={clsx(styles.circularProgress)}
                    aria-label={title}
                    id={id}
                    color={color}
                    value={normalizedValue}
                    variant={progressVariant}
                />
            )}



        </div>
    );
}

export default Loader;