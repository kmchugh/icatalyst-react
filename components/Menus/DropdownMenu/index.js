import React, {useState} from 'react';

import IconButton from '../../IconButton';
import Icon from '../../Icon';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PropTypes from 'prop-types';
import { createMuiStyles, cxMui } from '../../../utilities';

const styles = (theme) => {
  return {
    root : {
      cursor: 'default'
    },
    primaryItem : {
      display : 'flex',
      flexDirection: 'row',
      alignItems : 'center',
    },
    menuIcon : {
      marginLeft : theme.spacingNum(1),
    },
    listItem : {
      padding: 0,
      paddingRight: theme.spacingNum(2)
    },
    customItemWrapper : {
      overflow : 'inherit'
    },
    sublistItem : {
      paddingRight: 0,
    },
    sublistItemText : {
      flexGrow: 1
    },
  };
};

const useStyles = createMuiStyles(styles);

function DropdownMenu({
  size = 'small',
  title = '',
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
  color= 'inherit',
  className,
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
    <div className={cxMui(styles.root, className, classes.root)}>
      <div className={cxMui(styles.primaryItem)}>
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
          className={cxMui(styles.menuIcon, classes.menuIcon)}
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
        className={cxMui(styles.menu, classes.menu)}
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
                className={cxMui(isElement ? styles.customItemWrapper : '')}
                key={menuitem.key || menuitem.id || menuitem.title}
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
                      className={cxMui(
                        styles.listItem,
                        classes.listItem,
                        styles.sublistItem,
                        classes.sublistItem
                      )}
                      component="div"
                      aria-label={title}
                    >
                      {icon && (
                        <ListItemIcon>
                          <Icon color={iconColor}>{icon}</Icon>
                        </ListItemIcon>
                      )}

                      <ListItemText
                        primary={title}
                        secondary={subtitle}
                        className={cxMui(
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
                        className={cxMui(styles.listItem, classes.listItem)}
                        aria-label={title}
                        component="div"
                      >
                        {icon && (
                          <ListItemIcon>
                            <Icon color={iconColor}>{icon}</Icon>
                          </ListItemIcon>
                        )}

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
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size : PropTypes.oneOf(['small', 'medium', 'large']),
  title : PropTypes.string,
  label : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
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
