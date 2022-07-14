import React, { FunctionComponent } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseContainer, BaseContainerProps } from '../BaseContainer';
import { tinycolor } from '@icatalyst/core';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex'
        },
        opacityWrapperFn: ({ imageAlpha }: any) => {
            return {
                width: '100%',
                height: '100%',
                background: tinycolor.tinycolor(
                    theme.palette.background.default
                ).setAlpha(1 - (imageAlpha / 100)).toHex8String(),
            }
        },
        containerImageFn: ({ image, imageFit, imagePosition }: any) => {
            return {
                backgroundImage: `url('${image}')`,
                objectFit: imageFit,
                backgroundSize: imageFit === 'fill' ? 'auto' : imageFit,
                backgroundPosition: imagePosition
            };
        }
    };
});

export type CoverImageContainerProps = {
    image: string,
    imagePosition?: 'top' | 'bottom' | 'center',
    imageFit?: 'cover' | 'contain' | 'fill',
    imageAlpha: number
} & BaseContainerProps;

export const CoverImageContainer: FunctionComponent<CoverImageContainerProps> = ({
    className,
    children,
    image,
    imageFit = 'cover',
    imagePosition = 'center',
    imageAlpha = 75,
    ...rest
}) => {
    const styles = useStyles({
        image,
        imageFit,
        imagePosition,
        imageAlpha
    });
    return (
        <div className={clsx(
            styles.root,
            styles.containerImageFn,
            className
        )}>
            <BaseContainer
                className={clsx(
                    styles.opacityWrapperFn
                )}
                {...rest}
            >
                {children}
            </BaseContainer>
        </div>

    );
}