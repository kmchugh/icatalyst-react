import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { SyntheticEvent, useEffect, useState } from 'react';
import { BaseComponent } from '../../types';
import { getMimeType, mostReadable, tinycolor } from '@icatalyst/react/core';
import { Image } from '../images';

const validMimeTypes = [
    'audio',
    'video',
    'image'
];

const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            borderRadius: theme.shape.borderRadius,
        },
        image: {
            borderRadius: theme.shape.borderRadius,
        },
        video: {
            maxWidth: '100%',
            maxHeight: '100%',
        },
        audio: {

        }
    };
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MediaProps extends Omit<BaseComponent<'span'>, 'onLoad' | 'onError'> {
    backgroundColor?: string;
    defaultSrc?: string;
    mimeType?: string;
    src: string;
    alt: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    autoPlay?: boolean,
    controls?: boolean,

    onLoad: (e: SyntheticEvent, source: string) => void,
    onError: (e: SyntheticEvent, source: string) => void,
}

export function Media({
    className,
    style,
    backgroundColor = 'transparent',
    defaultSrc,
    src,
    mimeType,
    alt,
    crossOrigin,
    autoPlay = false,
    controls = true,
    onLoad,
    onError
}: MediaProps) {
    const styles = useStyles();

    const [source, setSource] = useState(src);
    const [mediaType, setMediaType] = useState(mimeType || getMimeType(src).split('/')[0]);

    const defaultSource = defaultSrc ?
        defaultSrc : (
            mostReadable(
                tinycolor(backgroundColor || 'transparent'), ['#fff', '#000']
            )?.toHexString() === '#000000' ?
                'assets/images/placeholders/image_dark.svg' :
                'assets/images/placeholders/image_light.svg'
        );

    useEffect(() => {
        setSource(src ? src : defaultSource);
    }, [src, defaultSource]);

    useEffect(() => {
        if (!mimeType) {
            const mime = getMimeType(source);
            setMediaType(mime && mime.split('/')[0].toLowerCase());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source]);

    return (
        <div className={clsx(styles.root, className)} style={style}>

            {(source && mediaType && mediaType === 'audio') && (
                <audio
                    className={clsx(styles.audio)}
                    crossOrigin={crossOrigin}
                    controls={controls}
                    autoPlay={autoPlay}
                    onCanPlay={(e) => {
                        if (source !== defaultSource) {
                            onLoad && onLoad(e, source);
                        }
                    }}
                    onError={(e) => {
                        if (source !== defaultSource) {
                            setSource(defaultSource);
                            setMediaType(getMimeType(defaultSource).split('/')[0]);
                        }
                        onError && onError(e, source);
                    }}
                >
                    <source
                        src={source}
                        type={getMimeType(source)}
                    />
                </audio>
            )}

            {(source && mediaType && mediaType === 'video') && (
                <video
                    className={clsx(styles.video)}
                    controls={controls}
                    crossOrigin={crossOrigin}
                    autoPlay={autoPlay}
                    onCanPlay={(e) => {
                        if (source !== defaultSource) {
                            onLoad && onLoad(e, source);
                        }
                    }}
                    onError={(e) => {
                        if (source !== defaultSource) {
                            setSource(defaultSource);
                            setMediaType(getMimeType(defaultSource).split('/')[0]);
                        }
                        onError && onError(e, source);
                    }}
                >
                    <source src={source} type={getMimeType(source)} />
                </video>
            )}

            {(source && mediaType && mediaType === 'image') && (
                <Image
                    className={clsx(styles.image)}
                    src={source}
                    alt={alt}
                    crossOrigin={crossOrigin}
                />
            )}

            {(!source || !mediaType || validMimeTypes.indexOf(mediaType) < 0) && (
                <Image
                    className={clsx(styles.image)}
                    src={defaultSource}
                    alt={alt}
                />
            )}
        </div>
    );
}

export default Media;