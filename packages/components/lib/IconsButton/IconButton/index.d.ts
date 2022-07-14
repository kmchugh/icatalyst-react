import { FunctionComponent } from 'react';
import { BaseComponent, ComponentColor, ComponentSize } from '../../types';
export declare type IconButtonProps = {
    title?: string;
    color?: ComponentColor;
    size?: ComponentSize;
    icon?: string;
    id?: string;
} & BaseComponent<"button">;
export declare const IconButton: FunctionComponent<IconButtonProps>;
