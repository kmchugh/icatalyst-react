var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseContainer } from '../BaseContainer';
import { tinycolor } from '@icatalyst/core';
var useStyles = makeStyles(function (theme) {
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
        opacityWrapperFn: function (_a) {
            var imageAlpha = _a.imageAlpha;
            return {
                width: '100%',
                height: '100%',
                background: tinycolor(theme.palette.background.default).setAlpha(1 - (imageAlpha / 100)).toHex8String(),
            };
        },
        containerImageFn: function (_a) {
            var image = _a.image, imageFit = _a.imageFit, imagePosition = _a.imagePosition;
            return {
                backgroundImage: "url('".concat(image, "')"),
                objectFit: imageFit,
                backgroundSize: imageFit === 'fill' ? 'auto' : imageFit,
                backgroundPosition: imagePosition
            };
        }
    };
});
export var CoverImageContainer = function (_a) {
    var className = _a.className, children = _a.children, image = _a.image, _b = _a.imageFit, imageFit = _b === void 0 ? 'cover' : _b, _c = _a.imagePosition, imagePosition = _c === void 0 ? 'center' : _c, _d = _a.imageAlpha, imageAlpha = _d === void 0 ? 75 : _d, rest = __rest(_a, ["className", "children", "image", "imageFit", "imagePosition", "imageAlpha"]);
    var styles = useStyles({
        image: image,
        imageFit: imageFit,
        imagePosition: imagePosition,
        imageAlpha: imageAlpha
    });
    return (React.createElement("div", { className: clsx(styles.root, styles.containerImageFn, className) },
        React.createElement(BaseContainer, __assign({ className: clsx(styles.opacityWrapperFn) }, rest), children)));
};
