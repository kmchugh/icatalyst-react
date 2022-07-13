import { FunctionComponent } from 'react';
import { ComponentColor, ComponentSize, CoreComponent } from '@icatalyst/core';
export declare type IconProps = {
    children?: string;
    color?: ComponentColor;
    size?: ComponentSize;
} & CoreComponent;
export declare const Icon: FunctionComponent<IconProps>;
