import { CSSProperties, makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { BaseComponent, ComponentSize } from '../../types';

import defaultDarkBackground from '../../assets/images/placeholders/image_light.svg';
import defaultLightBackground from '../../assets/images/placeholders/image_dark.svg';
import { Icon } from '../../icons';
import useHookWithRefCallback from '../../hooks/useHookWithRefCallback';
import { tinycolor, mostReadable } from '@icatalyst/react/core';

type StyleProps = {
    spinnerSize : ComponentSize,
    spinnerColor? : string | null,
    backgroundColor? : string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles((theme: any) => {
    return {
        '@keyframes rotating': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(360deg)'
            }
        },
        root: {
            position: 'relative',
            display: 'inline-block',
            overflow: 'hidden'
        },
        image: {
            opacity: 0,
            transition: `opacity ${theme.transitions.duration.shortest}ms linear`,
            height: '100%',
            width: '100%'
        },
        image_loaded: {
            opacity: 1,
        },
        spinner: {
            position: 'absolute',
            animation: `$rotating ${theme.transitions.duration.shorter * 10}ms linear infinite`,
            opacity: 1,
            transition: `opacity ${theme.transitions.duration.shortest}ms linear`
        },
        spinner_loaded: {
            opacity: 0,
        },
        spinnerFn({
            spinnerSize,
            spinnerColor
        }: StyleProps) {
            const sizes: {
                [key: string]: string
            } = {
                small: theme.spacing(2.5),
                medium: theme.spacing(3),
                large: theme.spacing(4.5),
            };

            const offset: {
                [key: string]: string
            } = {
                small: theme.spacing(1.25),
                medium: theme.spacing(1.5),
                large: theme.spacing(2.25),
            };

            const calcSize = sizes[spinnerSize] || theme.spacing(2);
            const offsetSize = offset[spinnerSize] || theme.spacing(1);
            return {
                width: calcSize,
                height: calcSize,
                top: `calc(50% - ${offsetSize})`,
                left: `calc(50% - ${offsetSize})`,
                color: spinnerColor || 'initial'
            };
        },
        backgroundFn: ({backgroundColor} : StyleProps) => {
            return {
                backgroundColor : backgroundColor
            };
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
    imageStyle? : CSSProperties,
    backgroundColor? : string
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
    imageStyle,
    backgroundColor,
    onError
}: ImageProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme: any = useTheme();

    const [source, setSource] = useState<string>(src);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(!src);
    const [derivedBackground, setDerivedBackground] = useState<string | undefined>(backgroundColor);

    const derivedSpinnerColor = useMemo(()=>{
        return spinnerColor || mostReadable(derivedBackground || theme.palette.background.default,
            ['#fff', '#000'], {}
        )?.toHexString();
    }, [spinnerColor, derivedBackground, theme]);

    const styles = useStyles({
        spinnerSize,
        spinnerColor : derivedSpinnerColor,
        backgroundColor : derivedBackground
    });
    
    if (!defaultSrc) {
        defaultSrc = derivedSpinnerColor === '#000000' ?
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

    useEffect(() => {
        setDerivedBackground(backgroundColor);
    }, [backgroundColor]);

    const [backgroundRef] = useHookWithRefCallback((ref) => {
        if (ref && !derivedBackground) {
            const color = tinycolor(getComputedStyle(ref).backgroundColor);
            if (color.getAlpha() > 0) {
                setDerivedBackground(color.toHex8String());
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onError && onError(e as any);
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