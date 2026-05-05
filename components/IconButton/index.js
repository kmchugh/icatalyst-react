import React from 'react';
import { Tooltip, IconButton as NativeButton} from '@mui/material';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles(()=>{
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
    size,
    ...rest
  } = props;

  return (
    <Tooltip
      title={title || ''}
      slotProps={{
        popper: {
          disablePortal: true
        }
      }}
    >
      <span id={id} className={cxMui(classes.root)}>
        <NativeButton
          className={cxMui(classes.iconButton, className)}
          color={color}
          aria-label={title}
          onClick={onClick}
          size={size}
          {...rest}
        >
          <Icon
            size={size}
            className={cxMui(classes.icon)}
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
  id : PropTypes.string,
  size : PropTypes.oneOf([
    'small',
    'medium',
    'large'
  ])
};

export default IconButton;
