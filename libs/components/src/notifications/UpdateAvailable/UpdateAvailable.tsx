import { Button, Modal, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Container } from '../../containers';
import { BaseComponent } from '../../types';

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            background: theme.palette.background.default,
        },
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateAvailableProps extends BaseComponent<'div'> {
}

export function UpdateAvailable({
    className,
    style,
}: UpdateAvailableProps) {
    const styles = useStyles();
    const theme: any = useTheme();

    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        const listener = () => {
            setUpdateAvailable(true);
        };
        window.addEventListener('updateAvailable', listener);

        return () => {
            window.removeEventListener('updateAvailable', listener);
        };
    }, []);

    const onReload = () => {
        window.location.reload();
    };

    // TODO: Make use of localization for text in this control

    return (updateAvailable && (
        <Modal
            open={updateAvailable}
            onClose={onReload}
        >
            <Container
                className={clsx(styles.root)}
                verticalAlign='center'
                horizontalAlign='center'
            >
                <Typography variant="h6">
                    An update is available
                </Typography>
                <Typography variant="subtitle1">
                    Please refresh for the latest version
                </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={onReload}
                >
                    Refresh
                </Button>
            </Container>
        </Modal>
    )) || null;
}

export default UpdateAvailable;