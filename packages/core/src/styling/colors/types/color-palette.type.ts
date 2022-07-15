import { ColorSwatch } from "./color-swatch.type";



export type ColorPalette = {
    primary: ColorSwatch,
    secondary: ColorSwatch,
    warning?: ColorSwatch,
    error?: ColorSwatch,
    success?: ColorSwatch,
    info?: ColorSwatch,

    [key: string]: ColorSwatch | undefined
};