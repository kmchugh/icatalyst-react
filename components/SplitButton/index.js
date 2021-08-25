import React, {useRef, useState} from 'react';
import {
  ButtonGroup, Button, Popper, Grow, Paper,
  ClickAwayListener, MenuList, MenuItem,
  Typography
} from '@material-ui/core';

import Icon from '../Icon';
import IconButton from '../IconButton';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
    },
    popper : {
      zIndex : 999
    },
    selectedButton : {

    },
    switchButton : {
      paddingLeft: theme.spacing(.5),
      paddingRight: theme.spacing(.5),
      minWidth: theme.spacing(4)
    },
    menuWrapper : {

    },
    optionWrapper : {

    }
  };
});

const SplitButton = ({
  className,
  variant = 'contained',
  size = 'medium',
  color = 'default',
  value,
  title = 'Switch Menu',
  options,
  onChange
})=>{
  const classes = useStyles();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [storedValue, setStoredValue] = useState(value);

  const handleOptionClick = (e, value)=>{
    value.onClick && value.onClick(e, value);
  };

  const openMenu = ()=>{
    setOpen(true);
  };

  const closeMenu = ()=>{
    setOpen(false);
  };

  const handleMenuItemClick = (e, item)=>{
    setStoredValue(item.value);
    closeMenu();
    onChange && onChange(item.value, item);
  };

  const renderOption = (option)=>{
    return (
      <div className={clsx(classes.optionWrapper)}>
        <IconButton
          className={clsx(classes.itemIconButton, option.className)}
          size={size}
          title={option.title}
          icon={option.icon}
        />
        {
          (option.selectedLabel || option.label) && (
            <Typography>
              {(storedValue === option.value && option.selectedLabel) || option.label}
            </Typography>
          )
        }
      </div>
    );
  };

  return (
    <div className={clsx(classes.root, className)}>
      <ButtonGroup
        variant={variant}
        size={size}
        color={color}
        aria-label={title}
      >
        <Button
          className={clsx(classes.selectedButton)}
          size={size}
          component="div"
          onClick={(e)=>handleOptionClick(e, value)}
        >
          {
            storedValue && (
              renderOption(options.find(o=>o.value===value))
            )
          }
        </Button>

        <Button
          className={clsx(classes.switchButton)}
          size={size}
          ref={anchorRef}
          component="div"
          aria-controls={'split-button-menu'}
          aria-expanded={open}
          aria-label="Button Group"
          aria-haspopup="menu"
          onClick={openMenu}
        >
          <Icon
            size={size}
          >
            arrow_drop_down
          </Icon>
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        className={clsx(classes.popper)}
        anchorEl={anchorRef.current}
        role="menu"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={clsx(classes.menuWrapper)}>
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList id="split-button-menu">
                  {
                    options.filter(o=>o.value!==storedValue).map((option)=>{
                      return (
                        <MenuItem
                          key={option.title}
                          selected={storedValue !== null && option.value === storedValue}
                          onClick={(e)=>{handleMenuItemClick(e, option);}}
                        >
                          {
                            renderOption(option)
                          }
                        </MenuItem>
                      );
                    })
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

SplitButton.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  options : PropTypes.arrayOf(PropTypes.shape({
    onClick : PropTypes.func,
    className : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    title : PropTypes.string.isRequired,
    icon : PropTypes.string.isRequired,
    value : PropTypes.any.isRequired
  })).isRequired,
  variant : PropTypes.oneOf(['contained', 'outlined', 'text']),
  size : PropTypes.oneOf(['large', 'medium', 'small']),
  color : PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  value : PropTypes.string,
  title: PropTypes.string,
  onChange : PropTypes.func
};

export default SplitButton;
