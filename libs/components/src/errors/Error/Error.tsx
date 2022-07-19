import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { BaseComponent } from '../../types';

const useStyles = makeStyles((/*theme*/) => {
  return {
    root: {},
  };
});

type Error = {
    message : string
};

export interface ErrorProps extends Omit<BaseComponent<'span'>, 'children'>{
  children : string | ReactNode | Error
}

export function Error({
  className,
  style,
  children
}: ErrorProps) {
  const styles = useStyles();

  const message = typeof children === 'string' ? children : (children as Error).message;
  
  return (
    <div className={clsx(styles.root, className)} style={style}>
        {message && (
            <Typography>
                {message}
            </Typography>
        )}
        {!message && (children as ReactNode)}
    </div>
  );
}

export default Error;