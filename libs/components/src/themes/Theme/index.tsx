import { createColorPalette } from '@icatalyst/react/core';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

export interface ThemeProps {
    children: ReactNode
}

export function Theme({
    children
}: ThemeProps) {

    // Load the theme from the reducer
    const theme: any = useSelector(({ icatalyst }: any) => icatalyst?.settings?.current?.themes?.mainTheme as any);

    const palette = createColorPalette({
        primary: '#239ddb',
        secondary: '#191b21',
    });

    const themeBase = createTheme({
        palette: palette,
    });

    return (
        <ThemeProvider theme={themeBase}>
            {children}
        </ThemeProvider>
    );
}

export default Theme;