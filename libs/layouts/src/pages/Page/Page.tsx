import { Container, ContainerProps, ContainerRef, NavigationToggleButton } from '@icatalyst/react/components';
import { mostReadable, tinycolor } from '@icatalyst/react/core';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useSelector } from 'react-redux';

type StyleProps = {
    backgroundColor: string;
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
            position: 'absolute!important' as 'absolute',
            top: theme.spacing(.5),
            left: theme.spacing(1),
            display: 'none',

            [theme.breakpoints.down('lg')]: {
                display: 'inline-flex'
            }
        },
        navigationFn: ({ renderNavigation }: StyleProps) => {
            return renderNavigation ? {
                [theme.breakpoints.down('lg')]: {
                    paddingTop: theme.spacing(5),
                }
            } : {};
        },
        iconColorFn: ({ backgroundColor }: StyleProps) => {
            const textColor: string = mostReadable(
                backgroundColor,
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
                backgroundColor,
                [
                    theme.palette.text.primary,
                    theme.palette.primary.contrastText,
                    theme.palette.secondary.contrastText,
                ]
            )?.toHex8String() || theme.palette.text.primary;

            // console.log('textcolor', {
            //     backgroundColor,
            //     textColor
            // });
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

    const theme: any = useTheme();
    const [derivedBackground, setDerivedBackground] = useState<string>();
    const [innerRef, setInnerRef] = useState<ContainerRef>();

    // const containerRef = useRef<ContainerRef | undefined | null>();
    const containerRef = useCallback((node: ContainerRef) => {
        setDerivedBackground(node?.backgroundColor || theme.palette.background.default);
        setInnerRef(node);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const styles = useStyles({
        backgroundColor: derivedBackground || theme.palette.background.default,
        renderNavigation
    });

    const { toolbar = {
        display: false
    } } = useSelector<any, {
        toolbar: {
            display: boolean
        }
    }>(({ icatalyst }) => icatalyst.settings.current.layout);

    useEffect(() => {
        if (!containerRef || !ref) {
            return;
        }
        if (typeof ref === 'function') {
            ref(innerRef);
        } else {
            ref.current = innerRef;
        }
    }, [innerRef, containerRef, ref]);

    return (
        <Container
            className={clsx(
                styles.root,
                styles.colorFn,
                styles.navigationFn,
                className
            )}
            style={style}
            ref={containerRef}
            backgroundColor={backgroundColor}
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