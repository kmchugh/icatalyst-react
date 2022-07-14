import { SxProps, Theme } from "@mui/material";
import React, { CSSProperties, ElementType } from "react";
export declare type BaseComponent<T extends ElementType> = React.ComponentPropsWithRef<T> & {
    className?: string;
    style?: CSSProperties;
    sx?: SxProps<Theme>;
};
