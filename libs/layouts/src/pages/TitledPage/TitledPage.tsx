import { ComponentSize, IconButtonProps } from '@icatalyst/react/components';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactNode } from 'react';
import Page, { PageProps } from '../Page';
import PageHeader from './components/PageHeader/PageHeader';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {},
        header: {
            display: 'flex',
            flexGrow: 0,
            flexShrink: 0,
            width: '100%',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
        }
    };
});

export interface TitledPageProps extends PageProps {
    title: string;
    headerSize?: ComponentSize;
    actions?: (IconButtonProps | ReactNode)[],
    headerClassName?: string;
    contentClassName?: string;
}

export function TitledPage({
    className,
    style,
    children,
    renderNavigation,
    headerSize,
    title,
    actions,
    headerClassName,
    contentClassName,
    ...rest
}: TitledPageProps) {
    const styles = useStyles();
    return (
        <Page
            className={clsx(styles.root, className)}
            style={style}
            // Render the navigation in the title instead of the page base
            renderNavigation={false}
            {...rest}
        >
            <PageHeader
                className={clsx(styles.header, headerClassName)}
                title={title}
                renderNavigation={renderNavigation}
                size={headerSize}
                actions={actions}
            />

            <div className={clsx(styles.content, contentClassName)}>
                {children}
            </div>

        </Page>
    );
}

export default TitledPage;