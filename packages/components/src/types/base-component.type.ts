import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export type BaseComponent = {
    className?: string,
    style?: CSSProperties,
    sx?: SxProps<Theme>;
};