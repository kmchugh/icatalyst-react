import { Container, ContainerProps, NavigationToggleButton, useHookWithRefCallback } from '@icatalyst/react/components';
import { mostReadable, tinycolor } from '@icatalyst/react/core';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type StyleProps = {
    backgroundColor?: string;
    renderNavigation?: boolean;
};

const useStyles = makeStyles((theme: any) => {
    const transparentPrimary = tinycolor(theme.palette.primary.main).setAlpha(.6).toHex8String();
    const transparentSecondary = tinycolor(theme.palette.secondary.main).setAlpha(.6).toHex8String();
    return {
        root: {
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            position: 'relative',
            flexShrink: 0,
        },
        mobileNavButton: {
            position: 'absolute!important',
            top: theme.spacing(.5),
            left: theme.spacing(1),
            display: 'none',

            [theme.breakpoints.down('lg')]: {
                display: 'block'
            }
        },
        navigationFn: ({ renderNavigation }: StyleProps) => {
            return renderNavigation ? {
                [theme.breakpoints.down('lg')]: {
                    paddingTop: theme.spacing(5),
                }
            } : {};
        },
        backgroundFn: ({ backgroundColor }: StyleProps) => {
            return backgroundColor ? {
                backgroundColor
            } : {};
        },
        iconColorFn: ({ backgroundColor }: StyleProps) => {
            const textColor: string = mostReadable(
                backgroundColor || theme.palette.background.default,
                [
                    transparentPrimary,
                    transparentSecondary
                ]
            )?.toHex8String() || theme.palette.action.active;

            return {
                color: textColor
            };
        },
        colorFn: ({ backgroundColor }: StyleProps) => {
            const textColor: string = mostReadable(
                backgroundColor || theme.palette.background.default,
                [
                    theme.palette.text.primary,
                    theme.palette.primary.contrastText,
                    theme.palette.secondary.contrastText,
                ]
            )?.toHex8String() || theme.palette.text.primary;

            return {
                color: textColor
            };
        }
    };
});

export interface PageProps extends ContainerProps {
    /**
     * Renders a navbar toggle button if on a small device
     */
    renderNavigation?: boolean;
}

export const Page = forwardRef(({
    className,
    style,
    children,
    backgroundColor,
    renderNavigation = true,
    ...rest
}: PageProps, ref) => {
    // TODO: Create a useBackgroundColor hook which will get the parent element with a background set and extract the color
    const [derivedBackground, setDerivedBackground] = useState<string | undefined>(backgroundColor);

    useEffect(() => {
        setDerivedBackground(backgroundColor);
    }, [backgroundColor]);

    const styles = useStyles({
        backgroundColor,
        renderNavigation
    });

    const { toolbar = {
        display: false
    } } = useSelector<any, {
        toolbar: {
            display: boolean
        }
    }>(({ icatalyst }) => icatalyst.settings.current.layout);

    const [pageRef] = useHookWithRefCallback((ref) => {
        if (ref && !derivedBackground) {
            const color = tinycolor(getComputedStyle(ref).backgroundColor);
            if (color.getAlpha() > 0) {
                setDerivedBackground(color.toHex8String());
            }
        }
    }, []);


    return (
        <Container
            className={clsx(
                styles.root,
                styles.colorFn,
                styles.backgroundFn,
                styles.navigationFn,
                className
            )}
            style={style}
            ref={pageRef}
            {...rest}
        >
            {
                // If the toolbar is not displayed then we need
                // to allow access to the navigation
                (!toolbar.display && renderNavigation) && (
                    <NavigationToggleButton className={clsx(
                        styles.mobileNavButton,
                        styles.iconColorFn
                    )}
                        title={'toggle'}
                    />
                )
            }
            {children}
        </Container>
    );
});

export default Page;