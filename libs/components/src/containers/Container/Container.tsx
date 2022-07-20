import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { ComponentAlignmentHorizontal, ComponentAlignmentVertical, ContainerComponent, ImageFit } from '../../types';
import { tinycolor } from '@icatalyst/react/core';
import { forwardRef, Ref, RefObject, useEffect, useImperativeHandle, useState } from 'react';
import { useHookWithRefCallback } from '../../hooks';

type StyleArgs = {
    verticalAlign: ComponentAlignmentVertical;
    horizontalAlign: ComponentAlignmentHorizontal;
    imageSrc?: string;
    imageFit?: ImageFit;
    imagePosition?: ComponentAlignmentVertical;
    imageAlpha?: number;
    backgroundColor?: string | null;
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
                backgroundColor: tinycolor(
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
    verticalAlign?: ComponentAlignmentVertical;
    horizontalAlign?: ComponentAlignmentHorizontal;
    /**
     * Sets the background color and text updates to reflect most readable
     */
    backgroundColor?: string;
    imageSrc?: string;
    imagePosition?: ComponentAlignmentVertical;
    imageFit?: ImageFit;
    imageAlpha?: number;
    ref?: RefObject<ContainerRef>;
};

export interface ContainerRef {
    component: HTMLDivElement;
    backgroundColor: string | null;
};

export const Container = forwardRef((props: ContainerProps, ref: Ref<ContainerRef>) => {
    const {
        className,
        style,
        children,
        verticalAlign = 'top',
        horizontalAlign = 'left',
        imageSrc,
        imageFit = 'cover',
        imagePosition = 'center',
        imageAlpha = .05,
        backgroundColor = null,
        ...rest
    } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme: any = useTheme();

    // TODO: Create a useBackgroundColor hook which will get the parent element with a background set and extract the color
    const [derivedBackground, setDerivedBackground] = useState<string | null>(null);

    useEffect(() => {
        let color = backgroundColor;
        if (color) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const parsedColor = tinycolor(backgroundColor!);
            color = parsedColor.isValid ? parsedColor.toHex8String() : null;
        }
        if (color !== derivedBackground) {
            // @ts-expect-error typing specified ref could be an instance or fuction, that is basically what we are chacking here
            if (ref.current) {
                // @ts-expect-error typing specified ref could be an instance or fuction, that is basically what we are chacking here
                ref.current.backgroundColor = color;
            }
            setDerivedBackground(color);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backgroundColor]);

    const styles = useStyles({
        verticalAlign,
        horizontalAlign,
        imageSrc,
        imageFit,
        imagePosition,
        imageAlpha,
        backgroundColor: derivedBackground || theme.palette.background.primary
    });

    const [pageRef] = useHookWithRefCallback<HTMLDivElement>((newRef) => {
        if (newRef && !derivedBackground) {
            const color = tinycolor(getComputedStyle(newRef).backgroundColor);
            if (color.getAlpha() > 0) {
                const extractedColor = color.toHex8String();
                setDerivedBackground(extractedColor);
                // @ts-expect-error typing specified ref could be an instance or fuction, that is basically what we are chacking here
                if (ref?.current) {
                    // @ts-expect-error typing specified ref could be an instance or fuction, that is basically what we are chacking here
                    ref.current.backgroundColor = extractedColor;
                }
            }
        }
    }, []);

    useImperativeHandle(ref, () => {
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            component: pageRef.current!,
            backgroundColor: derivedBackground
        };
    }, [pageRef, derivedBackground]);

    return (
        <div
            className={clsx(
                styles.root,
                !imageSrc && styles.containerRoot,
                !imageSrc && styles.contentAlignFn,
                styles.containerImageFn,
                !imageSrc && className
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
Container.displayName = 'Container';

export default Container;