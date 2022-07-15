import { IconButtonProps as NativeProps } from '@mui/material';
import { FunctionComponent } from 'react';
import { ComponentColor, ComponentSize } from '../../types';
export declare type IconButtonProps = {
    title?: string;
    color?: ComponentColor;
    size?: ComponentSize;
    icon?: string;
} & NativeProps;
export declare const IconButton: FunctionComponent<IconButtonProps>;
