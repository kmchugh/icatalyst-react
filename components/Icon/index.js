import React from 'react';
import { Icon as MUIIcon } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    'font-small': {
      fontSize: `${theme.spacing(2)}px!important`
    },
    'font-default': {
      fontSize: `${theme.spacing(3)}px!important`
    },
    'font-large': {
      fontSize: `${theme.spacing(4)}px!important`
    },
    'font-inherit': {
      fontSize: 'inherit!important'
    }
  };
});

const fa_font_map = {
  'inherit': undefined,
  'default': '1x',
  'small': 'sm',
  'large': 'lg'
};

const Icon = ({
  children = 'fa question',
  color = 'inherit',
  // TODO: consolidate fontSize and size to size only
  fontSize = 'medium',
  size = 'medium',
  ...rest
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const definedSize = size || fontSize;
  // if (fontSize) {
  //   console.warn('fontSize has been deprecated on Icon, use size instead');
  // }

  if (children.startsWith('fa ')) {
    let icon = children.substr(3);
    icon = icon.includes(' ') ? icon.split(' ') : icon;
    return <FontAwesomeIcon
      className={clsx(classes[`font-${definedSize}`])}
      style={(color && [
        'action',
        'primary',
        'secondary',
        'success',
        'error',
        'info'
      ].indexOf(color) > 0) ? {
        color: color === 'action' ?
          theme.palette[color].active :
          theme.palette[color].main
      } : null}
      {...rest}
      size={fa_font_map[definedSize] || fa_font_map['inherit']}
      icon={icon} />;
  } else {
    return (<MUIIcon color={color} {...rest} fontSize={definedSize}>{children}</MUIIcon>);
  }
};

Icon.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.oneOf([
    'inherit',
    'default',
    'small',
    'large',
    'medium'
  ]),
  size: PropTypes.oneOf([
    'inherit',
    'default',
    'small',
    'large',
    'medium'
  ])
};

export default React.memo(Icon);
