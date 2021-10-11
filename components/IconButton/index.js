import React from 'react';
import { Tooltip, IconButton as NativeButton} from '@material-ui/core';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(()=>{
  return {
    root : {
    },
    iconButton : {

    },
    icon : {
      // This is a fix for fontawesome icons of different sizes
      // not centering in the icon button
      '& .svg-inline--fa' : {
        width: '100%',
      }
    }
  };
});

const IconButton = (props)=>{
  const classes = useStyles();
  const {
    title,
    icon,
    color = 'inherit',
    onClick,
    className,
    id,
    ...rest
  } = props;

  return (
    <Tooltip
      title={title}
    >
      <span id={id} className={clsx(classes.root)}>
        <NativeButton
          className={clsx(classes.iconButton, className)}
          color={color}
          aria-label={title}
          onClick={onClick}
          {...rest}
        >
          <Icon
            className={clsx(classes.icon)}
          >{icon}</Icon>
        </NativeButton>
      </span>
    </Tooltip>
  );
};

IconButton.propTypes = {
  onClicked : PropTypes.func,
  onClick : PropTypes.func,
  icon: PropTypes.string,
  title : PropTypes.string,
  color : PropTypes.string,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  id : PropTypes.string
};

export default IconButton;
