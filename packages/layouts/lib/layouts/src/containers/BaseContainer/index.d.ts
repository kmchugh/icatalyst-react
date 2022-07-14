import { FunctionComponent } from 'react';
import { ContainerComponent } from '@icatalyst/components';
export declare type BaseContainerProps = {
    verticalAlign?: 'top' | 'center' | 'bottom';
    horizontalAlign?: 'left' | 'center' | 'right';
} & ContainerComponent<"div">;
export declare const BaseContainer: FunctionComponent<BaseContainerProps>;
