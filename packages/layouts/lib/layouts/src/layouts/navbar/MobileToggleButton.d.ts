import { FunctionComponent } from 'react';
import { BaseComponent } from '@icatalyst/components';
import { IconButtonProps } from '@icatalyst/components/lib/buttons/IconButton';
export declare type MobileToggleButtonProps = Omit<IconButtonProps, 'children'> & {
    icon?: string;
} & BaseComponent<"div">;
export declare const MobileToggleButton: FunctionComponent<MobileToggleButtonProps>;
