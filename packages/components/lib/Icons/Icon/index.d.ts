import { FunctionComponent } from 'react';
import { BaseComponent, ComponentColor, ComponentSize } from '../../types';
export declare type IconProps = {
    children?: string;
    color?: ComponentColor;
    size?: ComponentSize;
} & BaseComponent<"span">;
declare const Icon: FunctionComponent<IconProps>;
export default Icon;
