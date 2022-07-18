import { SxProps, Theme } from "@mui/material";
import React, { CSSProperties, ElementType } from "react";

export interface BaseComponent<T extends ElementType> extends
    Omit<React.HTMLAttributes<T>, 'onChange'> {
    // The class for the root component
    className?: string,
    // Additional styling for the root component
    style?: CSSProperties,
    // sx styling for the root component if supported
    sx?: SxProps<Theme>;
    /**
     * called when the value is changed through user interaction on the interactive control
     */
    onChange?: (e:
        React.ChangeEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement> | null,
        value: any
    ) => {}
};

