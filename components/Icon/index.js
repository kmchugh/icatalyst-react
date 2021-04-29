import React from 'react';
import {Icon as MUIIcon} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme)=>{
  return {
    root : {},
    'font-small' : {
      fontSize: theme.spacing(2)
    },
    'font-default' : {
      fontSize: theme.spacing(3)
    },
    'font-large' : {
      fontSize: theme.spacing(4)
    },
    'font-inherit' : {
      fontSize: 'inherit'
    }
  };

});

const Icon = ({
  children = 'fa question',
  color,
  fontSize = 'default',
  ...rest
})=>{
  const theme = useTheme();
  const classes = useStyles();

  if (children.startsWith('fa ')) {
    let icon = children.substr(3);
    icon = icon.includes(' ') ? icon.split(' ') : icon;
    return <FontAwesomeIcon
      className={clsx(classes[`font-${fontSize}`])}
      style={color ? {
        color : color === 'action' ?
          theme.palette[color].active :
          theme.palette[color].main
      } : null}
      {...rest}
      icon={icon}/>;
  } else {
    return (<MUIIcon color={color} {...rest} fontSize={fontSize}>{children}</MUIIcon>);
  }
};

Icon.propTypes = {
  children: PropTypes.string,
  color : PropTypes.string,
  fontSize : PropTypes.oneOf([
    'inherit',
    'default',
    'small',
    'large'
  ])
};

export default React.memo(Icon);
