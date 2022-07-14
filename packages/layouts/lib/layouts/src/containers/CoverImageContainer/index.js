import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseContainer } from '../BaseContainer';
import { tinycolor } from '@icatalyst/core';
const useStyles = makeStyles((theme) => {
    return {
        root: {
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            boxSizing: 'border-box'
        },
        opacityWrapperFn: ({ imageAlpha }) => {
            return {
                width: '100%',
                height: '100%',
                background: tinycolor.tinycolor(theme.palette.background.default).setAlpha(1 - (imageAlpha / 100)).toHex8String(),
            };
        },
        containerImageFn: ({ image, imageFit, imagePosition }) => {
            return {
                backgroundImage: `url('${image}')`,
                objectFit: imageFit,
                backgroundSize: imageFit === 'fill' ? 'auto' : imageFit,
                backgroundPosition: imagePosition
            };
        }
    };
});
export const CoverImageContainer = ({ className, children, image, imageFit = 'cover', imagePosition = 'center', imageAlpha = 75, ...rest }) => {
    const styles = useStyles({
        image,
        imageFit,
        imagePosition,
        imageAlpha
    });
    return (React.createElement("div", { className: clsx(styles.root, styles.containerImageFn, className) },
        React.createElement(BaseContainer, { className: clsx(styles.opacityWrapperFn), ...rest }, children)));
};
