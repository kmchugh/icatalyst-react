import React, { FunctionComponent } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import MUIIcon from '@mui/material/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { BaseComponent, ComponentColor, ComponentSize } from '../../types';

// TODO: https://mui.com/material-ui/customization/theming/#custom-variables
const useStyles = makeStyles((theme: any) => {
  return {
    root: {},

    sizeFn: ({ size }: any) => {
      const sizes: {
        [key: string]: string
      } = {
        inherit: 'inherit',
        small: theme.typography.pxToRem(20),
        medium: theme.typography.pxToRem(20),
        large: theme.typography.pxToRem(20),
      };

      return {
        fontSize: sizes[size]
      };
    },

    colorFn: ({ color }: any) => {
      const colors: {
        [key: string]: string | undefined
      } = {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        info: theme.palette.info.main,
        success: theme.palette.success.main,
        warning: theme.palette.warning.main,
        action: theme.palette.action.active,
        error: theme.palette.error.main,
        disabled: theme.palette.action.disabled,
        inherit: undefined
      };

      return {
        color: colors[color]
      };
    }
  };
});

export type IconProps = {
  children?: string
  color?: ComponentColor,
  size?: ComponentSize,
} & BaseComponent<"span">;

const Icon: FunctionComponent<IconProps> = ({
  className,
  style,
  sx,
  children = 'fa question',
  color = 'inherit',
  size = 'medium'
}) => {
  const styles = useStyles({
    size,
    color
  });

  if (children.startsWith('fa ')) {
    const faType = children.substring(3).split(' ', 2);
    if (faType.length === 1) {
      faType.unshift('fas');
    }
    const faIcon = faType as [IconPrefix, IconName];
    return (
      <FontAwesomeIcon
        className={clsx(
          styles.root,
          styles.sizeFn,
          styles.colorFn,
          className
        )}
        icon={faIcon}
        style={style}
      />
    );
  } else {
    return (
      <MUIIcon
        className={clsx(styles.root, className)}
        style={style}
        color={color}
        fontSize={size}
        sx={sx}
      >
        {children}
      </MUIIcon>
    );
  }
}

export default Icon;