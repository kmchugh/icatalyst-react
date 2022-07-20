import { ComponentColor } from '@icatalyst/react/components';
import { Link, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import InfoPage, { InfoPageProps } from '../InfoPage/InfoPage';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {},
        link: {}
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
    const styles = useStyles();
    return (
        <InfoPage
            className={clsx(styles.root, className)}
            style={style}
            title={title}
            excerpt={message}
            icon={icon}
            iconColor={iconColor}
            renderNavigation={false}
            content={linkText && (
                <Typography>
                    <Link
                        className={clsx(styles.link)}
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