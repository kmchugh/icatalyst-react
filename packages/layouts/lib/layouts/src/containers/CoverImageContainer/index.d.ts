import { FunctionComponent } from 'react';
import { BaseContainerProps } from '../BaseContainer';
export declare type CoverImageContainerProps = {
    image: string;
    imagePosition?: 'top' | 'bottom' | 'center';
    imageFit?: 'cover' | 'contain' | 'fill';
    opacity: number;
} & BaseContainerProps;
export declare const CoverImageContainer: FunctionComponent<CoverImageContainerProps>;
