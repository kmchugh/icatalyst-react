import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Icon } from '../../icons';
import { BaseComponent } from '../../types';

const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  };
});

export interface ErrorProps extends Omit<BaseComponent<'span'>, 'children'> {
  children: ReactNode | Error
}

export function Error({
  className,
  style,
  children
}: ErrorProps) {
  const styles = useStyles();

  const message = children && (typeof children === 'string' ? children : (children as Error).message);

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <Icon className={clsx(styles.icon)}>
        priority_high
      </Icon>

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