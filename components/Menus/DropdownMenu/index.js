import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import { Menu, MenuItem, Fade,
  ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import {IconButton, Icon} from '@icatalyst/components';
import PropTypes from 'prop-types';

const styles = (theme) => {
  return {
    root : {
      cursor: 'default'
    },
    menuIcon : {
      marginLeft : theme.spacing(1),
    },
    listItem : {
      padding: 0,
      paddingRight: theme.spacing(2)
    }
  };
};

const useStyles = makeStyles(styles);

function DropdownMenu({
  size = 'small',
  title = 'menu',
  id = 'menu',
  icon = 'more_vertical',
  menu
}){
  const classes = useStyles();
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
  };

  return (
    <div className={clsx(classes.root)}>
      <IconButton
        title={title}
        className={clsx(classes.menuIcon)}
        component="div"
        size={size}
        icon={icon}
        aria-haspopup={true}
        aria-controls={anchorEl ? menuID : undefined}
        onClick={openMenu}/>
      <Menu
        id={menuID}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={!!anchorEl}
        onClose={closeMenu}
        className={clsx(classes.menu)}
        TransitionComponent={Fade}
      >
        {
          menu.filter(i=>i).map((menuitem)=>{
            const isElement = React.isValidElement(menuitem);
            const {
              title,
              onClick,
              icon,
              subtitle
            } = menuitem;
            return (
              <MenuItem
                key={menuitem.title || menuitem.key}
                onClick={(e)=>{
                  e.stopPropagation();
                  closeMenu(e);
                  if (!isElement) {
                    onClick && onClick(e);
                  }
                }}>
                {
                  isElement ? menuitem : (
                    <ListItem
                      className={clsx(classes.listItem)}
                      aria-label={title}>
                      {
                        <ListItemIcon>
                          <Icon>{icon}</Icon>
                        </ListItemIcon>
                      }
                      <ListItemText
                        primary={title}
                        secondary={subtitle}
                      />
                    </ListItem>
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
  icon : PropTypes.string,
  id : PropTypes.string,
  menu : PropTypes.arrayOf(PropTypes.shape({
    title : PropTypes.string.isRequired,
    subtitle : PropTypes.string,
    key : PropTypes.string,
    onClick : PropTypes.func.isRequired,
    icon : PropTypes.string
  })).isRequired
};


export default DropdownMenu;
