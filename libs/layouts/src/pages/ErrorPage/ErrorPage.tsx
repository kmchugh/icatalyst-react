import { ComponentColor, ContainerRef } from '@icatalyst/react/components';
import { Link, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import InfoPage, { InfoPageProps } from '../InfoPage/InfoPage';
import { mostReadable } from '@icatalyst/react/core';

type StyleProps = {
    backgroundColor: string;
};

const useStyles = makeStyles((theme: any) => {
    return {
        root: {},
        linkWrapper: {
            marginBottom: theme.spacing(2)
        },
        link: {
        },
        linkColorFn: ({ backgroundColor }: StyleProps) => {
            const color = mostReadable(
                backgroundColor,
                [
                    theme.palette.primary.main,
                    theme.palette.primary.light,
                    theme.palette.primary.dark,
                ]
            )?.toHex8String();

            return {
                color: color,
                textDecorationColor: color
            };
        }
    };
});

export interface ErrorPageProps extends InfoPageProps {
    title: string;
    message?: string;
    linkPath?: string;
    linkText?: string;
    icon?: string;
    iconColor?: ComponentColor;
}

export function ErrorPage({
    className,
    style,
    children,
    title,
    message,
    linkPath = "/",
    linkText,
    icon = "error",
    iconColor = "error",
    ...rest
}: ErrorPageProps) {
    const theme: any = useTheme();

    const [derivedBackground, setDerivedBackground] = useState<string>();

    const styles = useStyles({
        backgroundColor: derivedBackground || theme.palette.background.default,
    });

    const containerRef = useCallback((node: ContainerRef) => {
        setDerivedBackground(node?.backgroundColor || theme.palette.background.default);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <InfoPage
            className={clsx(styles.root, className)}
            style={style}
            title={title}
            excerpt={message}
            icon={icon}
            ref={containerRef}
            iconColor={iconColor}
            renderNavigation={false}
            content={linkText && (
                <Typography className={clsx(styles.linkWrapper)}>
                    <Link
                        className={clsx(styles.link, styles.linkColorFn)}
                        href={linkPath}
                    >
                        {linkText}
                    </Link>
                </Typography>
            )}
            {...rest}
        >
            {children}
        </InfoPage>
    );
}

export default ErrorPage;