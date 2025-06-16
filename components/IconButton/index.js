import React from 'react';
import { Tooltip, IconButton as NativeButton} from '@mui/material';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {styled} from '@mui/styles';

const Root = styled('span')({});

const StyledIconButton = styled(NativeButton)({});

const IconWrapper = styled(Icon)({
  // This is a fix for fontawesome icons of different sizes
  // not centering in the icon button
  '& .svg-inline--fa' : {
    width: '100%',
  }
});

const IconButton = (props)=>{
  const {
    title,
    icon,
    color = 'inherit',
    onClick,
    className,
    id,
    size,
    ...rest
  } = props;

  return (
    <Tooltip
      title={title || ''}
    >
      <Root id={id}>
        <StyledIconButton
          className={clsx(className)}
          color={color}
          aria-label={title}
          onClick={onClick}
          size={size}
          {...rest}
        >
          <IconWrapper
            size={size}
          >{icon}</IconWrapper>
        </StyledIconButton>
      </Root>
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
  id : PropTypes.string,
  size : PropTypes.oneOf([
    'small',
    'medium',
    'large'
  ])
};

export default IconButton;
