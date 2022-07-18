import { CSSProperties, makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BaseComponent, ComponentSize } from '../../types';

import defaultDarkBackground from '../../assets/images/placeholders/image_light.svg';
import defaultLightBackground from '../../assets/images/placeholders/image_dark.svg';
import { Icon } from '../../icons';
import useHookWithRefCallback from '../../hooks/useHookWithRefCallback';
import { tinycolor, mostReadable } from '@icatalyst/react/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            position: 'relative'
        },
        image: {
            opacity: 0,
            transition: `opacity ${theme.transitions.shortest}ms linear`
        },
        image_loaded: {
            opacity: 1,
        },
        spinner: {
            position: 'absolute',
            animation: `$rotating ${theme.transitions.shorter * 10}ms linear infinite`,
            opacity: 1,
            transition: `opacity ${theme.transitions.shortest}ms linear`
        },
        spinner_loaded: {
            opacity: 0,
        },
        spinnerFn({
            spinnerSize,
            spinnerColor
        }: {
            spinnerSize : ComponentSize,
            spinnerColor? : string | null
        }) {
            const sizes: {
                [key: string]: string
            } = {
                small: theme.spacing(2.5),
                medium: theme.spacing(3),
                large: theme.spacing(4.5),
            };

            const calcSize = sizes[spinnerSize] || theme.spacing(2);
            return {
                width: calcSize,
                height: calcSize,
                top: `calc(50% - ${calcSize})`,
                left: `calc(50% - ${calcSize})`,
                color: spinnerColor || 'initial'
            };
        },
        '@keyframes rotating': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(360deg)'
            }
        },
    };
});

export interface ImageProps extends BaseComponent<"span"> {
    src: string,
    alt: string,
    defaultSrc?: string,
    spinnerSize?: ComponentSize,
    spinnerColor?: string,
    imageClassName? : string,
    imageStyle? : CSSProperties
};

export function Image({
    className,
    style,
    src,
    defaultSrc,
    spinnerSize = 'medium',
    spinnerColor,
    alt,
    imageClassName,
    imageStyle
}: ImageProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme: any = useTheme();

    const styles = useStyles({
        spinnerSize,
        spinnerColor
    });

    const [source, setSource] = useState<string>(src);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(!src);
    const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
    
    if (!defaultSrc) {
        defaultSrc = mostReadable(backgroundColor || theme.palette.background.default,
            ['#fff', '#000'], {}
        )?.toHexString() === '#000000' ?
            defaultLightBackground :
            defaultDarkBackground;
    }

    useEffect(() => {
        if (src !== source) {
            setError(null);
            setLoading(true);
            setSource(src);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    const [backgroundRef] = useHookWithRefCallback((ref) => {
        if (ref) {
            const color = tinycolor(getComputedStyle(ref).backgroundColor);
            if (color.getAlpha() > 0) {
                setBackgroundColor(color.toHex8String());
            }
        }
    }, []);

    return (
        <span
            className={clsx(styles.root, className)}
            ref={backgroundRef}
            style={style}
        >
            <img
                alt={alt}
                className={clsx(
                    styles.image,
                    !loading && styles.image_loaded,
                    imageClassName
                )}
                style={imageStyle}
                src={error ? defaultSrc : source}
                onLoad={() => {
                    // Set timeout here to ensure the state of loading has time to change
                    setTimeout(() => {
                        setLoading(false);
                    }, 100);
                }}
                onError={(e) => {
                    setLoading(false);
                    if (!error) {
                        setError(e);
                    }
                }}
            />
            <Icon className={clsx(
                styles.spinner,
                !loading && styles.spinner_loaded,
                styles.spinnerFn
            )}>
                fa spinner
            </Icon>
        </span>
    );
}

export default Image;