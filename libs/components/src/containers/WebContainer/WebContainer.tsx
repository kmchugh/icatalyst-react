import { Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import IframeResizer from 'iframe-resizer-react';
import { useState } from 'react';
import { Loader } from '../../progress';
import { ContainerProps } from '../Container';


const useStyles = makeStyles((/*theme*/) => {
    return {
        root: {
            position: 'relative',
            width: '100%',
            height: '100%',
            '& > div': {
                position: 'absolute!important'
            },
            display: 'flex',
            flexDirection: 'column'
        },
        modalWrapper: {
            width: '100%',
            height: '100%'
        },
        iframe: {
            border: 'none',
            flexGrow: 1
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
            <IframeResizer
                className={clsx(styles.iframe)}
                title={title}
                id={`${id}_iframe`}
                src={src}
                sandbox={sandbox.join(' ')}
                onLoad={() => {
                    setLoaded(true);
                }}
                style={{
                    width: '1px',
                    minWidth: '100%',
                }}
                autoResize
                scrolling
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