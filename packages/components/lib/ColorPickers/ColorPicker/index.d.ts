import { FunctionComponent } from 'react';
import { BaseComponent } from '../../types';
export declare type ColorPickerProps = {
    style?: object;
    value?: string;
    onChange?: Function;
    hideTextfield?: boolean;
    defaultColor?: string;
} & BaseComponent<"div">;
export declare const ColorPicker: FunctionComponent<ColorPickerProps>;
