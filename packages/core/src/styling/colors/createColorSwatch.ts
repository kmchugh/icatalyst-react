import { TinyColor } from "@ctrl/tinycolor";
import { tinycolor, mostReadable, ColorInput } from "../../libs/@tinycolor";
import { ColorSwatch } from "./types/color-swatch.type";

export function createColorSwatch(color: ColorInput): ColorSwatch {
    const tc = tinycolor(color);
    const variants = {
        '50': tc.clone().lighten(52).toHex8String(),
        '100': tc.clone().lighten(37).toHex8String(),
        '200': tc.clone().lighten(26).toHex8String(),
        '300': tc.clone().lighten(12).toHex8String(),
        '400': tc.clone().lighten(6).toHex8String(),
        '500': tc.toHex8String(),
        '600': tc.clone().darken(6).toHex8String(),
        '700': tc.clone().darken(12).toHex8String(),
        '800': tc.clone().darken(18).toHex8String(),
        '900': tc.clone().darken(24).toHex8String(),
        'A100': tc.clone().lighten(50).saturate(30).toHex8String(),
        'A200': tc.clone().lighten(30).saturate(30).toHex8String(),
        'A400': tc.clone().lighten(10).saturate(15).toHex8String(),
        'A700': tc.clone().lighten(5).saturate(5).toHex8String(),
    };

    return {
        main: variants['500'],
        light: variants['200'],
        dark: variants['700'],
        compliment: tc.clone().mix(tc.clone().spin(180), 80).toHex8String(),
        contrastText: mostReadable(tc, ['#fff', '#000'])?.toHex8String() || '#fff',
        variants
    };
}