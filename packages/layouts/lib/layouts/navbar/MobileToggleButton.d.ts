import { BaseComponent, IconButtonProps } from '@icatalyst/components';
import { FunctionComponent } from 'react';
export declare type MobileToggleButtonProps = Omit<IconButtonProps, 'children'> & {
    icon?: string;
} & BaseComponent<"div">;
export declare const MobileToggleButton: FunctionComponent<MobileToggleButtonProps>;
