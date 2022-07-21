import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useState } from 'react';
import { ContainerProps } from '../Container';
import Iframe from 'react-iframe';
import { Modal } from '@mui/material';
import { Loader } from '../../progress';

const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {
            position: 'relative',
            width: '100%',
            height: '100%',
            '& > div': {
                position: 'absolute!important'
            }
        },
        modalWrapper: {
            width: '100%',
            height: '100%'
        },
        iframe: {
            border: 'none'
        },
        modalBackdrop: {
            position: 'absolute'
        }
    };
});

export type IFrameSandboxProps = 'allow-downloads' |
    'allow-forms' |
    'allow-modals' |
    'allow-orientation-lock' |
    'allow-pointer-lock' |
    'allow-popups' |
    'allow-popups-to-escape-sandbox' |
    'allow-presentation' |
    'allow-same-origin' |
    'allow-scripts' |
    'allow-storage-access-by-user-activation' |
    'allow-top-navigation' |
    'allow-top-navigation-by-user-activation';


export interface WebContainerProps extends Omit<ContainerProps, 'children'> {
    title: string;
    src: string;
    sandbox?: IFrameSandboxProps[]
}

export function WebContainer({
    className,
    style,
    id = 'webModalWrapper',
    src,
    title,
    sandbox = [
        'allow-same-origin',
        'allow-scripts',
        'allow-forms',
        'allow-downloads'
    ]
}: WebContainerProps) {
    const styles = useStyles();
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className={clsx(styles.root, className)}
            style={style}
            id={id}
        >
            <Iframe
                className={clsx(styles.iframe)}
                title={title}
                url={src}
                width="100%"
                height="100%"
                // @ts-expect-error sandbox is typed as individual strings but accepts delimited strings
                sandbox={sandbox.join(' ')}
                onLoad={() => {
                    setLoaded(true);
                }}
            />

            <Modal
                container={() => {
                    return document.getElementById(id);
                }}
                open={!loaded}
                componentsProps={{
                    backdrop: {
                        className: clsx(styles.modalBackdrop)
                    }
                }}
            >
                <div className={clsx(styles.modalWrapper)}>
                    <Loader />
                </div>
            </Modal>
        </div>
    );
}

export default WebContainer;