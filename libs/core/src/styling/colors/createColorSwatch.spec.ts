import { createColorSwatch } from './createColorSwatch';

describe('createColor', () => {
    it('should be defined', () => {
        expect(createColorSwatch).toBeDefined();
    });

    it('should generate a colorswatch from an rgb string', () => {
        const input = '#c82737';
        const output = {
            'compliment': '#47a89eff',
            'contrastText': '#ffffffff',
            'dark': '#951d29ff',
            'light': '#e88b94ff',
            'main': '#c82737ff',
            'variants': {
                '100': '#f2bac0ff',
                '200': '#e88b94ff',
                '300': '#dd4f5dff',
                '400': '#d83646ff',
                '50': '#fefafbff',
                '500': '#c82737ff',
                '600': '#ae2230ff',
                '700': '#951d29ff',
                '800': '#7b1822ff',
                '900': '#62131bff',
                'A100': '#ffeff1ff',
                'A200': '#fd8b96ff',
                'A400': '#ec3648ff',
                'A700': '#dd2b3dff',
            },
        };

        expect(createColorSwatch(input)).toEqual(output);
    });

    it('should generate a colorswatch from an rgba string', () => {
        const input = '#c82737aa';
        const output = {
            'compliment': '#47a89eab',
            'contrastText': '#ffffffff',
            'dark': '#951d29ab',
            'light': '#e88b94ab',
            'main': '#c82737aa',
            'variants': {
                '100': '#f2bac0ab',
                '200': '#e88b94ab',
                '300': '#dd4f5dab',
                '400': '#d83646ab',
                '50': '#fefafbab',
                '500': '#c82737aa',
                '600': '#ae2230ab',
                '700': '#951d29ab',
                '800': '#7b1822ab',
                '900': '#62131bab',
                'A100': '#ffeff1ab',
                'A200': '#fd8b96ab',
                'A400': '#ec3648ab',
                'A700': '#dd2b3dab',
            },
        };

        expect(createColorSwatch(input)).toEqual(output);
    });

    it('should generate a colorswatch from an rgb object', () => {
        const input = {
            r: 145,
            g: 145,
            b: 145,
        };
        const output = {
            'compliment': '#919191ff',
            'contrastText': '#000000ff',
            'dark': '#727272ff',
            'light': '#d3d3d3ff',
            'main': '#919191ff',
            'variants': {
                '100': '#efefefff',
                '200': '#d3d3d3ff',
                '300': '#b0b0b0ff',
                '400': '#a0a0a0ff',
                '50': '#ffffffff',
                '500': '#919191ff',
                '600': '#828282ff',
                '700': '#727272ff',
                '800': '#636363ff',
                '900': '#545454ff',
                'A100': '#ffffffff',
                'A200': '#e8d3d3ff',
                'A400': '#b79e9eff',
                'A700': '#a39999ff',
            },
        };

        expect(createColorSwatch(input)).toEqual(output);
    });

    it('should generate a colorswatch from an rgba object', () => {
        const input = {
            r: 145,
            g: 145,
            b: 145,
            a: 145
        };
        const output = {
            'compliment': '#919191ff',
            'contrastText': '#000000ff',
            'dark': '#727272ff',
            'light': '#d3d3d3ff',
            'main': '#919191ff',
            'variants': {
                '100': '#efefefff',
                '200': '#d3d3d3ff',
                '300': '#b0b0b0ff',
                '400': '#a0a0a0ff',
                '50': '#ffffffff',
                '500': '#919191ff',
                '600': '#828282ff',
                '700': '#727272ff',
                '800': '#636363ff',
                '900': '#545454ff',
                'A100': '#ffffffff',
                'A200': '#e8d3d3ff',
                'A400': '#b79e9eff',
                'A700': '#a39999ff',
            },
        };

        expect(createColorSwatch(input)).toEqual(output);
    });

    it('should generate a colorswatch from a hsl object', () => {
        const input = {
            h: 145,
            s: 145,
            l: 145,
        };
        const output = {
            'compliment': '#ffffffff',
            'contrastText': '#000000ff',
            'dark': '#e0e0e0ff',
            'light': '#ffffffff',
            'main': '#ffffffff',
            'variants': {
                '100': '#ffffffff',
                '200': '#ffffffff',
                '300': '#ffffffff',
                '400': '#ffffffff',
                '50': '#ffffffff',
                '500': '#ffffffff',
                '600': '#f0f0f0ff',
                '700': '#e0e0e0ff',
                '800': '#d1d1d1ff',
                '900': '#c2c2c2ff',
                'A100': '#ffffffff',
                'A200': '#ffffffff',
                'A400': '#ffffffff',
                'A700': '#ffffffff',
            },

        };

        expect(createColorSwatch(input)).toEqual(output);
    });

    it('should generate a colorswatch from a hsla object', () => {
        const input = {
            h: 145,
            s: 145,
            l: 145,
            a: 145
        };
        const output = {
            'compliment': '#ffffffff',
            'contrastText': '#000000ff',
            'dark': '#e0e0e0ff',
            'light': '#ffffffff',
            'main': '#ffffffff',
            'variants': {
                '100': '#ffffffff',
                '200': '#ffffffff',
                '300': '#ffffffff',
                '400': '#ffffffff',
                '50': '#ffffffff',
                '500': '#ffffffff',
                '600': '#f0f0f0ff',
                '700': '#e0e0e0ff',
                '800': '#d1d1d1ff',
                '900': '#c2c2c2ff',
                'A100': '#ffffffff',
                'A200': '#ffffffff',
                'A400': '#ffffffff',
                'A700': '#ffffffff',
            },

        };

        expect(createColorSwatch(input)).toEqual(output);
    });

    it('should generate a colorswatch from a hsv object', () => {
        const input = {
            h: 145,
            s: 145,
            v: 145,
        };
        const output = {
            'compliment': '#cc338cff',
            'contrastText': '#000000ff',
            'dark': '#00c251ff',
            'light': '#85ffb8ff',
            'main': '#00ff6aff',
            'variants': {
                '100': '#bdffd8ff',
                '200': '#85ffb8ff',
                '300': '#3dff8eff',
                '400': '#1fff7cff',
                '50': '#ffffffff',
                '500': '#00ff6aff',
                '600': '#00e05eff',
                '700': '#00c251ff',
                '800': '#00a344ff',
                '900': '#008537ff',
                'A100': '#ffffffff',
                'A200': '#99ffc4ff',
                'A400': '#33ff88ff',
                'A700': '#1aff79ff',
            },
        };

        expect(createColorSwatch(input)).toEqual(output);
    });

    it('should generate a colorswatch from a hsa object', () => {
        const input = {
            h: 145,
            s: 145,
            v: 145,
            a: 145
        };
        const output = {
            'compliment': '#cc338cff',
            'contrastText': '#000000ff',
            'dark': '#00c251ff',
            'light': '#85ffb8ff',
            'main': '#00ff6aff',
            'variants': {
                '100': '#bdffd8ff',
                '200': '#85ffb8ff',
                '300': '#3dff8eff',
                '400': '#1fff7cff',
                '50': '#ffffffff',
                '500': '#00ff6aff',
                '600': '#00e05eff',
                '700': '#00c251ff',
                '800': '#00a344ff',
                '900': '#008537ff',
                'A100': '#ffffffff',
                'A200': '#99ffc4ff',
                'A400': '#33ff88ff',
                'A700': '#1aff79ff',
            },

        };

        expect(createColorSwatch(input)).toEqual(output);
    });
});