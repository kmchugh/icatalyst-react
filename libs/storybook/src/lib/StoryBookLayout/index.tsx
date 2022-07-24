import { AppRouter, Container, ContainerComponent } from '@icatalyst/react/components';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactNode } from 'react';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#a3a3a3a3'
        },
        commandPanel: {
            flexGrow: 0,
            flexShrink: 1,
            width: '100%',
        },
        container: {
            padding: 0,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        content: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(2)
        }
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
            <div className={clsx(styles.commandPanel)}>
                <Container
                    className={clsx(styles.container)}
                    elevation={1}
                >
                    Command Panel
                </Container>
            </div>
            <div className={clsx(styles.content)}>
                <AppRouter>{children}</AppRouter>
            </div>
        </div>
    );
}

export default StoryBookLayout;