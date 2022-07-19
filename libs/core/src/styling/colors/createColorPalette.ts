import { tinycolor } from "../../libs/@tinycolor";
import { createColorSwatch } from "./createColorSwatch";
import { ColorPalette } from "./types/color-palette.type";
import { ColorSwatch } from "./types/color-swatch.type";
import { PaletteInput } from "./types/palette-input.type";

export function createColorPalette({
    primary,
    secondary,
    warning = 'orange',
    error = 'red',
    success = 'green',
    info = 'blue',
    tint = 75,
    ...rest
}: PaletteInput): ColorPalette {
    const custom = Object.keys(rest || {}).reduce((acc, key) => {
        const colour = rest[key];
        acc[key] = createColorSwatch(tinycolor(colour).toHex8String());
        return acc;
    }, {} as {
        [key: string]: ColorSwatch
    });

    return {
        primary: createColorSwatch(primary),
        secondary: createColorSwatch(secondary),
        warning: createColorSwatch(tinycolor(primary).mix(warning, tint).toHex8String()),
        error: createColorSwatch(tinycolor(primary).mix(error, tint).toHex8String()),
        success: createColorSwatch(tinycolor(primary).mix(success, tint).toHex8String()),
        info: createColorSwatch(tinycolor(primary).mix(info, tint).toHex8String()),
        ...custom
    };
};