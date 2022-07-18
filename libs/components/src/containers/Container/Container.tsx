import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ComponentAlignmentHorizontal, ComponentAlignmentVertical, ContainerComponent, ImageFit } from '../../types';
import {tinycolor} from '@icatalyst/react/core';

type StyleArgs = {
    verticalAlign : ComponentAlignmentVertical,
    horizontalAlign : ComponentAlignmentHorizontal,
    imageSrc? : string,
    imageFit? : ImageFit,
    imagePosition? : ComponentAlignmentVertical,
    imageAlpha? : number
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles((theme : any) => {
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
            return {
                backgroundImage: `url('${imageSrc}')`,
                objectFit: imageFit,
                backgroundSize: imageFit === 'fill' ? 'auto' : imageFit,
                backgroundPosition: imagePosition
            };
        },
        opacityFn: ({ imageSrc, imageAlpha = 1 }: StyleArgs) => {
            return imageSrc ? {
                background: tinycolor(
                    theme.palette.background.default
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

export interface ContainerProps extends ContainerComponent<"div">{
    verticalAlign?: ComponentAlignmentVertical,
    horizontalAlign?: ComponentAlignmentHorizontal,
    imageSrc?: string,
    imagePosition?: ComponentAlignmentVertical,
    imageFit?: ImageFit,
    imageAlpha?: number
};

export function Container({
    className,
    style,
    children,
    verticalAlign = 'top',
    horizontalAlign = 'left',
    imageSrc,
    imageFit = 'cover',
    imagePosition = 'center',
    imageAlpha = .1,
    ...rest
}: ContainerProps) {
    const styles = useStyles({
        verticalAlign,
        horizontalAlign,
        imageSrc,
        imageFit,
        imagePosition,
        imageAlpha
    });

    return (
        <div
            className={clsx(
                styles.root,
                !imageSrc && styles.containerRoot,
                !imageSrc && styles.contentAlignFn,
                styles.containerImageFn,
                className
            )}
            style={style}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...((!imageSrc ? {} : {...rest}) as any)}
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
}

export default Container;