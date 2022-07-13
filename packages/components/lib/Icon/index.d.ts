import { FunctionComponent } from 'react';
import { ComponentBase, ComponentColor, ComponentSize } from '../types';
export declare type IconProps = {
    children?: string;
    color?: ComponentColor;
    size?: ComponentSize;
} & ComponentBase;
export declare const Icon: FunctionComponent<IconProps>;
