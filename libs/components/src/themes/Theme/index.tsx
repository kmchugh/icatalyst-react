import { createColorPalette } from '@icatalyst/react/core';
import { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '../../buttons';

export interface ThemeProps {
    children: ReactNode
}

export function Theme({
    children
}: ThemeProps) {

    // Load the theme from the reducer
    const theme: any = useSelector(({ icatalyst }: any) => icatalyst?.settings?.current?.themes?.mainTheme as any);

    const themeBase = useMemo(() => {
        const palette = createColorPalette({
            primary: '#239ddb',
            secondary: '#191b21',
        });

        return createTheme({
            palette
        });

    }, [theme]);

    return (
        <ThemeProvider theme={themeBase}>
            {children}
        </ThemeProvider>
    );
}

export default Theme;