import { FunctionComponent } from 'react';
import { BaseComponent, ComponentColor, ComponentSize } from 'types';
export declare type IconProps = {
    children?: string;
    color?: ComponentColor;
    size?: ComponentSize;
} & BaseComponent;
export declare const Icon: FunctionComponent<IconProps>;
