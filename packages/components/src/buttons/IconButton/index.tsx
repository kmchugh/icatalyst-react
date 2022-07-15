import React, { FunctionComponent } from 'react';
import { Tooltip, IconButton as NativeButton, IconButtonProps as NativeProps } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { BaseComponent, ComponentColor, ComponentSize } from '../../types';
import { Icon } from '../../icons/Icon';

const useStyles = makeStyles((theme: any) => {
  return {
    root: {
    },
    icon: {},
    iconBtn: ({ size }: any) => {
      // As we want width and height to be equal same we need to parse size
      const stateSize = {
        inherit: '1.3em',
        small: theme.typography.pxToRem(20 + 8),
        medium: theme.typography.pxToRem(24 + 8),
        large: theme.typography.pxToRem(36 + 8)
      }[size];

      return {
        width: stateSize,
        height: stateSize,
      };
    }
  };
});

export type IconButtonProps = {
  title?: string,
  color?: ComponentColor,
  size?: ComponentSize,
  icon?: string,
} & NativeProps

export const IconButton: FunctionComponent<IconButtonProps> = ({
  className,
  title,
  icon,
  style,
  // Let Icon sort out the default color
  color,
  size = 'medium',
  id,
  ...rest
}) => {
  const styles = useStyles({
    size
  });

  return (
    <Tooltip title={title || ""}>
      {
        // Span is required here for the tooltip to work correctly 
      }
      <span
        id={id}
        className={clsx(styles.root)}
      >
        <NativeButton
          className={clsx(styles.iconBtn, className)}
          aria-label={title}
          style={style}
          {...rest}
        >
          <Icon
            size={size}
            color={color}
            className={clsx(styles.icon)}
          >{icon}</Icon>
        </NativeButton>
      </span>
    </Tooltip>
  );
}






