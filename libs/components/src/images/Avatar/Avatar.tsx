import { mostReadable } from '@icatalyst/react/core';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BaseComponent, ComponentSize } from '../../types';
import Image from '../Image';

type StyleProps = {
    size : ComponentSize,
    backgroundColor?: string
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles((theme?: any) => {
    const defaultBackground = theme.palette.secondary.light;
  return {
    root: {
        backgroundColor : theme.palette.secondary.light,
        overflow: 'hidden',
        position: 'relative'
    },
    backgroundFn: ({backgroundColor} : StyleProps) => {
        return {
            backgroundColor : backgroundColor || defaultBackground
        };
    },
    colorFn: ({backgroundColor} : StyleProps) => {
        return  {
            color : mostReadable(backgroundColor || defaultBackground,
                ['#fff', '#000'], {}
            )?.toHexString()
        };
    },
    sizeFn: ({ size }: StyleProps) => {
        const sizes: {
          [key: string]: string
        } = {
          inherit: 'inherit',
          small: theme.typography.pxToRem(24),
          medium: theme.typography.pxToRem(40),
          large: theme.typography.pxToRem(56),
        };

        const dimensions = sizes[size];
  
        return {
          width : dimensions,
          height : dimensions
        };
      },
      fontSizeFn: ({ size }: StyleProps) => {
        const sizes: {
          [key: string]: string
        } = {
          inherit: 'inherit',
          small: theme.typography.pxToRem(16),
          medium: theme.typography.pxToRem(32),
          large: theme.typography.pxToRem(48),
        };

        const dimensions = sizes[size];
  
        return {
          fontSize : dimensions,
        };
      },
      imageContainer : {
        backgroundColor : theme.palette.secondary.dark,
      },
      image : {
        objectFit : 'cover',
        backgroundSize : 'cover'
      },
      circular : {
        borderRadius :'50%',

        '& img' : {
            borderRadius : '50%',
        }
      },
      square : {},
      letter : {
        position: 'absolute',
        top: '50%',
        '-ms-transform': 'translateY(-50%)',
        transform: 'translateY(-50%)',
        left: 0,
        textAlign: 'center',
        width: '100%',
      }
  };
});

export interface AvatarProps extends BaseComponent<'span'> {
    title : string,
    variant? : 'circular' | 'square',
    size? : ComponentSize,
    src? : string,
    backgroundColor? : string,
}

export function Avatar({
  className,
  style,
  title,
  src = '',
  variant = 'circular',
  size = 'medium',
  backgroundColor
}: AvatarProps) {
    const styles = useStyles({
        size,
        backgroundColor
    });

    const [imageError, setImageError] = useState<boolean>(!src);

    const letter = title.substring(0, 1).toUpperCase();

    useEffect(()=>{
        setImageError(!src);
    }, [src]);

    return (
        <div 
            className={clsx(
                styles.root, 
                styles.sizeFn,
                styles[variant],
                styles.backgroundFn,
                className,
            )} 
            style={style}
        >
            {!imageError && <Image
                backgroundColor={backgroundColor}
                className={clsx(styles.sizeFn, styles.backgroundFn, styles.imageContainer)}
                imageClassName={clsx(styles.image, styles.sizeFn)}
                alt={title}
                src={src}
                onError={(e)=>{
                    setImageError(true);
                }}
            />}

            {imageError && <Typography variant="h4" component="span"
                className={clsx(
                    styles.letter,
                    styles.colorFn,
                    styles.fontSizeFn
                )}
            >
                {letter}
            </Typography>}
        </div>
    );
}

export default Avatar;