import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ComponentAlignmentHorizontal, ComponentAlignmentVertical, ContainerComponent, ImageFit } from '../../types';
import { tinycolor } from '@icatalyst/react/core';
import { ForwardedRef, forwardRef, RefObject, useEffect, useState } from 'react';
import { useHookWithRefCallback } from '../../hooks';

type StyleArgs = {
    verticalAlign: ComponentAlignmentVertical,
    horizontalAlign: ComponentAlignmentHorizontal,
    imageSrc?: string,
    imageFit?: ImageFit,
    imagePosition?: ComponentAlignmentVertical,
    imageAlpha?: number,
    backgroundColor?: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            boxSizing: 'border-box'
        },
        containerRoot: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            width: '100%',
            padding: theme.spacing(3)
        },
        containerImageFn: ({ imageSrc, imageFit, imagePosition }: StyleArgs) => {
            return imageSrc ? {
                backgroundImage: `url('${imageSrc}')`,
                objectFit: imageFit,
                backgroundSize: imageFit === 'fill' ? 'auto' : imageFit,
                backgroundPosition: imagePosition
            } : {};
        },
        opacityFn: ({ imageSrc, imageAlpha = 1, backgroundColor }: StyleArgs) => {
            return imageSrc ? {
                background: tinycolor(
                    backgroundColor || theme.palette.background.default
                ).setAlpha(1 - imageAlpha).toHex8String(),
            } : {};
        },
        contentAlignFn: ({
            verticalAlign,
            horizontalAlign
        }: StyleArgs) => {

            const vertical: {
                [key: string]: string
            } = {
                top: 'flex-start',
                center: 'center',
                bottom: 'flex-end'
            };
            const horizontal: {
                [key: string]: string
            } = {
                left: 'flex-start',
                center: 'center',
                right: 'flex-end'
            };

            return {
                justifyContent: vertical[verticalAlign],
                alignItems: horizontal[horizontalAlign]
            };
        }
    };
});

export interface ContainerProps extends ContainerComponent<"div"> {
    verticalAlign?: ComponentAlignmentVertical,
    horizontalAlign?: ComponentAlignmentHorizontal,
    /**
     * Sets the background color and text updates to reflect most readable
     */
    backgroundColor?: string,
    imageSrc?: string,
    imagePosition?: ComponentAlignmentVertical,
    imageFit?: ImageFit,
    imageAlpha?: number,
    ref?: RefObject<HTMLElement>;
};

export const Container = forwardRef(({
    className,
    style,
    children,
    verticalAlign = 'top',
    horizontalAlign = 'left',
    imageSrc,
    imageFit = 'cover',
    imagePosition = 'center',
    imageAlpha = .05,
    backgroundColor,
    ...rest
}: ContainerProps, ref) => {
    // TODO: Create a useBackgroundColor hook which will get the parent element with a background set and extract the color
    const [derivedBackground, setDerivedBackground] = useState<string | undefined>(backgroundColor);

    useEffect(() => {
        setDerivedBackground(backgroundColor);
    }, [backgroundColor]);

    const styles = useStyles({
        verticalAlign,
        horizontalAlign,
        imageSrc,
        imageFit,
        imagePosition,
        imageAlpha,
        backgroundColor
    });

    // TODO: Update ref handling

    const [pageRef] = useHookWithRefCallback((newRef) => {
        if (newRef && !derivedBackground) {
            const color = tinycolor(getComputedStyle(newRef).backgroundColor);
            if (color.getAlpha() > 0) {
                setDerivedBackground(color.toHex8String());
            }
        }
    }, []);


    return (
        <div
            className={clsx(
                styles.root,
                !imageSrc && styles.containerRoot,
                !imageSrc && styles.contentAlignFn,
                styles.containerImageFn,
                // className
            )}
            ref={pageRef}
            style={style}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...((!imageSrc ? {} : { ...rest }) as any)}
        >
            {imageSrc && (
                <div
                    className={clsx(
                        styles.root,
                        styles.containerRoot,
                        styles.contentAlignFn,
                        styles.opacityFn,
                        className
                    )}
                    style={style}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(rest as any)}
                >
                    {children}
                </div>
            )}
            {!imageSrc && (
                children
            )}
        </div>
    );
});

export default Container;