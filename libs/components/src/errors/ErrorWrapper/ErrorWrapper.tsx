import { mostReadable, tinycolor } from '@icatalyst/react/core';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Icon } from '../../icons';
import { BaseComponent } from '../../types';
import { Error } from '../Error/Error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles((theme : any) => {
    console.log({theme});
    
    const background : string = mostReadable(tinycolor(theme.palette.background.default), [
        theme.palette.error.dark,
        theme.palette.error.main,
        theme.palette.error.light,
      ])?.toHex8String() || theme.palette.error.light;
    
    const border = mostReadable(tinycolor(background), [
        theme.palette.error.dark,
        theme.palette.error.main,
        theme.palette.error.light,
        ])?.toHex8String() || theme.palette.error.dark;

    const text = mostReadable(tinycolor(background), [
        theme.palette.error.contrastText,
        theme.palette.error.dark,
        theme.palette.error.main,
        theme.palette.error.light,
        ])?.toHex8String() || theme.palette.error.contrastText;

  return {
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        border: `thin solid ${border}`,
        backgroundColor: background,
        color: text,
        width: '100%',
        position: 'relative',
        minHeight: '100%',
        boxSizing: 'border-box'
    },
    titleWrapper: {
        color : text,
        display : 'flex',
        alignItems : 'center'
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    list : {
    },
    listitem : {
        listStyle: 'circle',
        marginLeft: theme.spacing(3)
    },
    contentWrapper : {
        textAlign: 'center',
        margin: theme.spacing(2)
    }
  };
});

export interface ErrorWrapperProps extends BaseComponent<'span'> {
  title? : string,
  showDetails? : boolean,
  errors : {
    message : string
  }[],
  children? : ReactNode
}

export function ErrorWrapper({
  className,
  style,
  role = 'alert',
  title,
  showDetails = process.env['NODE_ENV'] !== 'production',
  errors = [],
  children
}: ErrorWrapperProps) {
  const styles = useStyles();
  return (
    <div
        className={clsx(styles.root, className)} 
        style={style}
        role={role}
    >
        {title && (
            <div className={clsx(styles.titleWrapper)}>
                <Icon 
                    className={clsx(styles.icon)}
                >
                    error
                </Icon>
                <Typography
                    variant="h5"
                    component="h1"
                >
                    {title}
                </Typography>
            </div>
        )}

        <ul className={clsx(styles.list)}>
        {showDetails && 
            errors.filter((e, index, self)=>{
                return self.findIndex((error)=>error.message === e.message) === index;
            }).map(error=>{
                const message = error.message || error.toString();
                return (
                    <li className={clsx(styles.listitem)} key={message}>
                        <Error>{message}</Error>
                    </li>
                );
            })
        }
        </ul>

        { children && (
            <div className={clsx(styles.contentWrapper)}>
                {children}
            </div>
        )}

    </div>
  );
}

export default ErrorWrapper;