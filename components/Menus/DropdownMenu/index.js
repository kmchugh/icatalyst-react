import React, {useState} from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';

import IconButton from '../../IconButton';
import Icon from '../../Icon';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PropTypes from 'prop-types';

const Root = styled('div')(() => ({
  cursor: 'default'
}));

const PrimaryItem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
}));

const MenuIcon = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1)
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  paddingRight: theme.spacing(2)
}));

const CustomItemWrapper = styled('div')(() => ({
  overflow: 'inherit'
}));

const SubListItem = styled(ListItem)(() => ({
  paddingRight: 0
}));

const SubListItemText = styled(ListItemText)(() => ({
  flexGrow: 1
}));

function DropdownMenu({
  size = 'small',
  title = '',
  id = 'menu',
  icon = 'more_vertical',
  menu,
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
    <Root className={clsx(className, 'root')}>
      <PrimaryItem>
        { label && (
          <ListItemText
            primary={label}
            secondary={secondaryLabel}
            onClick={openMenu}
          />
        )}
        <MenuIcon
          title={title}
          color={color}
          className="menuIcon"
          component="div"
          size={size}
          icon={icon}
          aria-haspopup={true}
          aria-controls={anchorEl ? menuID : undefined}
          onClick={openMenu}
        />
      </PrimaryItem>
      <Menu
        id={menuID}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        keepMounted
        open={!!anchorEl}
        onClose={closeMenu}
        className='menu'
        TransitionComponent={Fade}
      >
        {
          menu.filter(i=>i).map((menuItem) => {
            const isElement = React.isValidElement(menuItem);
            const {
              title,
              onClick,
              icon,
              subtitle,
              menu: subMenu,
              iconColor = 'inherit',
              showLabel = true
            } = menuItem;

            return (
              <MenuItem
                className={clsx(isElement && CustomItemWrapper)}
                key={menuItem.key || menuItem.id || menuItem.title}
                disabled={menuItem.disabled}
                selected={menuItem.selected}
                onClick={(e) => {
                  e.stopPropagation();
                  closeMenu(e);
                  if (!isElement) {
                    onClick && onClick(e);
                  }
                }}
              >
                {subMenu ? (
                  <SubListItem component="div" aria-label={title} className='listItem sublistItem'>
                    {icon && (
                      <ListItemIcon>
                        <Icon color={iconColor}>{icon}</Icon>
                      </ListItemIcon>
                    )}
                    <SubListItemText primary={title} secondary={subtitle} className='sublistItemText'/>
                    <DropdownMenu
                      icon="chevron_right"
                      menu={subMenu}
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
                  </SubListItem>
                ) : (
                  isElement ? menuItem : (
                    <StyledListItem component="div" aria-label={title} className='listItem'>
                      {icon && (
                        <ListItemIcon>
                          <Icon color={iconColor}>{icon}</Icon>
                        </ListItemIcon>
                      )}
                      {showLabel && <ListItemText primary={title} secondary={subtitle} />}
                    </StyledListItem>
                  )
                )}
              </MenuItem>
            );
          })}
      </Menu>
    </Root>
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
};

export default DropdownMenu;
