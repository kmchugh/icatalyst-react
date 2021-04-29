import React from 'react';
import { Tooltip, IconButton as NativeButton} from '@material-ui/core';
import Icon from '../Icon';
import PropTypes from 'prop-types';

const IconButton = (props)=>{
  const {
    title,
    icon,
    color = 'inherit',
    onClick,
    className,
    ...rest
  } = props;

  return (
    <Tooltip
      title={title}
    >
      <span>
        <NativeButton
          className={className}
          color={color}
          aria-label={title}
          onClick={onClick}
          {...rest}
        >
          <Icon>{icon}</Icon>
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
  className : PropTypes.string,
};

export default IconButton;
