import { ColorInput } from "libs/@tinycolor";

export type PaletteInput = {
    primary: ColorInput,
    secondary: ColorInput,
    warning?: ColorInput,
    error?: ColorInput,
    success?: ColorInput,
    info?: ColorInput,
    tint?: number,
    [key: string]: ColorInput
};