import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MUIIcon from '@mui/material/Icon';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { BaseComponent, ComponentColor, ComponentSize } from '../../types';

import faInit from '../../lib/fa-init';
faInit();

type StyleProps = {
  color: ComponentColor,
  size: ComponentSize
};

// TODO: https://mui.com/material-ui/customization/theming/#custom-variables
const useStyles = makeStyles((theme?: any) => {
  return {
    root: {
    },

    sizeFn: ({ size }: StyleProps) => {
      const sizes: {
        [key: string]: string
      } = {
        inherit: 'inherit',
        small: theme.typography.pxToRem(20),
        medium: theme.typography.pxToRem(24),
        large: theme.typography.pxToRem(36),
      };

      return {
        fontSize: sizes[size]
      };
    },

    colorFn: ({ color }: StyleProps) => {
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

export interface IconProps extends BaseComponent<"span"> {
  /**
   * The name of the icon to display.
   * Supports material icons by using the string directly.  e.g. 'dashboard'
   * Supports fontawesome with 'fa' prefix.  e.g. 'fa fab facebook' or 'fa question'
   * 
   */
  children?: string
  /**
   * The colour of the icon
   */
  color?: ComponentColor,
  /**
   * The size of the icon
   */
  size?: ComponentSize
};

export function Icon({
  className,
  style,
  sx,
  children = 'fa question',
  color = 'inherit',
  size = 'medium'
}: IconProps) {
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
