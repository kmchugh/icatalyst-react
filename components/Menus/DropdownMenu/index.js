import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import IconButton from '../../IconButton';
import Icon from '../../Icon';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PropTypes from 'prop-types';

const styles = (theme) => {
  return {
    root : {
      cursor: 'default'
    },
    primaryItem : {
      display : 'flex',
      flexDirection: 'row'
    },
    menuIcon : {
      marginLeft : theme.spacing(1),
    },
    listItem : {
      padding: 0,
      paddingRight: theme.spacing(2)
    },
    customItemWrapper : {
      overflow : 'inherit'
    },
    sublistItem : {
      paddingRight: 0,
    },
    sublistItemText : {
      flexGrow: 1
    }
  };
};

const useStyles = makeStyles(styles);

function DropdownMenu({
  size = 'small',
  title = 'menu',
  id = 'menu',
  icon = 'more_vertical',
  menu,
  classes = {},
  anchorOrigin = {
    vertical : 'bottom',
    horizontal: 'right'
  },
  transformOrigin= {
    vertical : 'top',
    horizontal: 'right'
  },
  label,
  secondaryLabel,
  onClose,
  color= 'inherit'
}){
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuID = `menu-${id}`;

  const openMenu = (e)=>{
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const closeMenu = (e)=>{
    if (e) {
      e.stopPropagation();
    }
    setAnchorEl(null);
    onClose && onClose();
  };

  return (
    <div className={clsx(styles.root, classes.root)}>
      <div className={clsx(styles.primaryItem)}>
        { label && (
          <ListItemText
            primary={label}
            secondary={secondaryLabel}
            onClick={openMenu}
          />
        )}
        <IconButton
          title={title}
          color={color}
          className={clsx(styles.menuIcon, classes.menuIcon)}
          component="div"
          size={size}
          icon={icon}
          aria-haspopup={true}
          aria-controls={anchorEl ? menuID : undefined}
          onClick={openMenu}/>
      </div>
      <Menu
        id={menuID}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        keepMounted
        open={!!anchorEl}
        onClose={closeMenu}
        className={clsx(styles.menu, classes.menu)}
        TransitionComponent={Fade}
      >
        {
          menu.filter(i=>i).map((menuitem)=>{
            const isElement = React.isValidElement(menuitem);
            const {
              title,
              onClick,
              icon,
              subtitle,
              menu,
              iconColor = 'inherit',
              showLabel = true
            } = menuitem;

            return (
              <MenuItem
                className={clsx(isElement ? styles.customItemWrapper : '')}
                key={menuitem.title || menuitem.key || menuitem.id}
                disabled={menuitem.disabled}
                selected={menuitem.selected}
                onClick={(e)=>{
                  e.stopPropagation();
                  closeMenu(e);
                  if (!isElement) {
                    onClick && onClick(e);
                  }
                }}>
                {
                  menu && (
                    <ListItem
                      className={clsx(
                        styles.listItem,
                        classes.listItem,
                        styles.sublistItem,
                        classes.sublistItem
                      )}
                      component="div"
                      aria-label={title}
                    >
                      <ListItemIcon>
                        <Icon color={iconColor}>{icon}</Icon>
                      </ListItemIcon>
                      <ListItemText
                        primary={title}
                        secondary={subtitle}
                        className={clsx(
                          styles.sublistItemText,
                          classes.sublistItemText
                        )}
                      />
                      <DropdownMenu
                        icon="chevron_right"
                        menu={menu}
                        anchorOrigin={{
                          vertical : 'top',
                          horizontal: 'left'
                        }}
                        transformOrigin={{
                          vertical : 'top',
                          horizontal: 'left'
                        }}
                        onClose={closeMenu}
                      />
                    </ListItem>
                  )
                }
                {
                  (!menu) && (
                    isElement ? menuitem : (
                      <ListItem
                        className={clsx(styles.listItem, classes.listItem)}
                        aria-label={title}
                        component="div"
                      >
                        <ListItemIcon>
                          <Icon color={iconColor}>{icon}</Icon>
                        </ListItemIcon>
                        {
                          showLabel && (<ListItemText
                            primary={title}
                            secondary={subtitle}
                          />)
                        }
                      </ListItem>
                    )
                  )
                }
              </MenuItem>
            );
          })
        }
      </Menu>
    </div>
  );
}

DropdownMenu.propTypes = {
  size : PropTypes.oneOf(['small', 'medium', 'large']),
  title : PropTypes.string,
  label : PropTypes.string,
  secondaryLabel : PropTypes.string,
  icon : PropTypes.string,
  iconSize : PropTypes.string,
  id : PropTypes.string,
  color : PropTypes.string,
  menu : PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        title : PropTypes.string.isRequired,
        subtitle : PropTypes.string,
        key : PropTypes.string,
        onClick : PropTypes.func,
        icon : PropTypes.string,
        disabled : PropTypes.bool,
        selected : PropTypes.bool,
        iconColor : PropTypes.string,
        menu : PropTypes.array
      })
    ])
  ).isRequired,
  anchorOrigin : PropTypes.shape({
    horizontal : PropTypes.oneOf([
      'center', 'left', 'right'
    ]).isRequired,
    vertical : PropTypes.oneOf([
      'bottom', 'center', 'top'
    ]).isRequired
  }),
  transformOrigin : PropTypes.shape({
    horizontal : PropTypes.oneOf([
      'center', 'left', 'right'
    ]).isRequired,
    vertical : PropTypes.oneOf([
      'bottom', 'center', 'top'
    ]).isRequired
  }),
  onClose : PropTypes.func,
  classes : PropTypes.object
};


export default DropdownMenu;
