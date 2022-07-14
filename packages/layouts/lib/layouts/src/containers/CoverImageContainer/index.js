import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseContainer } from '../BaseContainer';
import * as ICATALYST from '@icatalyst/core';
const useStyles = makeStyles(( /*theme: any*/) => {
    return {
        root: {},
        opacityWrapperFn: ({ opacity }) => {
            return {
                width: '100%',
                height: '100%',
                background: 'red',
            };
        },
        // @ts-expect-error
        containerImageFn: ({ image, imageFit, imagePosition }) => {
            console.log(image);
            return {
                backgroundImage: `url('${image}')`,
                objectFit: imageFit,
                backgroundSize: imageFit === 'fill' ? 'auto' : imageFit,
                backgroundPosition: imagePosition
            };
        }
    };
});
export const CoverImageContainer = ({ className, children, image, imageFit = 'cover', imagePosition = 'center', opacity = 1, ...rest }) => {
    const styles = useStyles({
        image,
        imageFit,
        imagePosition,
        opacity
    });
    console.log(ICATALYST);
    return (React.createElement(BaseContainer, { className: clsx(styles.root, styles.containerImageFn, className), ...rest },
        React.createElement("div", { className: clsx(styles.opacityWrapperFn) }, children)));
};
