import React, { FunctionComponent } from 'react';
import { Tooltip, IconButton as NativeButton } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { BaseComponent, ComponentColor, ComponentSize } from '../../types';
import { Icon } from '../../icons/Icon';

const useStyles = makeStyles((theme: any) => {
  return {
    root: {},
    // @ts-expect-error
    iconBtn: ({ size }) => {
      const StateSize = {
        inherit: 'inherit',
        small: theme.typography.pxToRem(20),
        medium: theme.typography.pxToRem(24),
        large: theme.typography.pxToRem(36)
      }[size];

      return {
        fontSize: StateSize
      }
    },
    // @ts-expect-error  
    colorFn: ({ color }) => {
      const stateColour = {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        info: theme.palette.info.main,
        success: theme.palette.success.main,
        warning: theme.palette.warning.main,
        action: theme.palette.action.active,
        error: theme.palette.error.main,
        disabled: theme.palette.action.disabled,
        inherit: undefined
      }[color];

      return {
        color: stateColour
      };
    }

  };
});

export type IconButtonProps = {
  title?: string,
  color?: ComponentColor,
  size?: ComponentSize,
  icon?: string,
  // onClick?:Function,
  id?: string

} & BaseComponent<"button">

export const IconButton: FunctionComponent<IconButtonProps> = ({
  className,
  title,
  icon,
  style,
  //  onClick,
  color = 'inherit',
  size = 'medium',
  id


}) => {
  const styles = useStyles({
    size,
    color
  });

  return (

    <Tooltip title={title || ""}>
      <span id={id}
        className={clsx(styles.root)}


      >
        <NativeButton className={clsx(styles.root, styles.colorFn, styles.iconBtn, className)}
          aria-label={title}
          style={style}
        // onClick={onClick}
        >
          <Icon
            className={clsx(styles.root, styles.iconBtn, className)}
          >{icon}</Icon>
        </NativeButton>

      </span>
    </Tooltip >


  )
}






