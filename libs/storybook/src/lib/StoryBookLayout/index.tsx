import { AppRouter, ContainerComponent } from '@icatalyst/react/components';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactNode } from 'react';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: '#a3a3a3'
        },
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoryBookLayoutProps extends Omit<ContainerComponent<'div'>, 'children'> {
    children?: ReactNode
}


export function StoryBookLayout(props: StoryBookLayoutProps) {
    const styles = useStyles();
    const { children } = props;

    return (
        <div className={clsx(styles.root)}>
            <AppRouter>{children}</AppRouter>
        </div>
    );
}

export default StoryBookLayout;