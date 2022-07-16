import { IconButtonProps as NativeProps } from '@mui/material';
import { ComponentColor, ComponentSize } from '../../types';
import { FunctionComponent } from 'react';
export declare type ClearableInputprops = {
    icon?: string;
    label?: string;
    value?: string;
    disply?: string;
    color?: ComponentColor;
    size?: ComponentSize;
} & NativeProps;
export declare const Clearableinput: FunctionComponent<ClearableInputprops>;
