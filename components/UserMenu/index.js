import React, {useState, useContext} from 'react';
import {Button, ListItemIcon, ListItemText,
  Popover, MenuItem, Typography} from '@material-ui/core';
import Avatar from '@icatalyst/components/Avatar';
import Icon from '@icatalyst/components/Icon';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import UserRoles from '@icatalyst/components/UserRoles';
import {SingularityContext} from '../Singularity';
import {useDispatch} from 'react-redux';
import {openUserSettings} from '@icatalyst/store/actions/settings.actions';
import PropTypes from 'prop-types';

function UserMenu({showSettings = false})
{
  const singularityContext = useContext(SingularityContext);
  const {user} = singularityContext;
  const dispatch = useDispatch();

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const onLogoutClicked = () => {
    userMenuClose();
    singularityContext.logout();
  };

  const onUserSettingsClicked = ()=>{
    userMenuClose();
    dispatch(openUserSettings());
  };

  return (
    <React.Fragment>

      <Button className="h-64" onClick={userMenuClick}>
        <Avatar
          className="h-32 w-32"
          border={false}
          alt={(user && user.displayname) || 'user profile image'}
          src={user && user.profileimageuri}
        />

        <div className="hidden md:flex flex-col ml-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user && user.displayname}
          </Typography>
          <UserRoles className="text-11 capitalize" color="textSecondary"/>
        </div>

        <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical  : 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical  : 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        {!user ? (
          <React.Fragment>
            <MenuItem component={Link} to="/login">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Login"/>
            </MenuItem>
            <MenuItem component={Link} to="/register">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Register"/>
            </MenuItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              showSettings && <MenuItem
                onClick={onUserSettingsClicked}
              >
                <ListItemIcon className="min-w-40">
                  <Icon>fa user-cog</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Settings"/>
              </MenuItem>
            }
            <MenuItem
              onClick={onLogoutClicked}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Logout"/>
            </MenuItem>
          </React.Fragment>
        )}
      </Popover>
    </React.Fragment>
  );
}

UserMenu.propTypes = {
  showSettings : PropTypes.bool
};

export default withRouter(UserMenu);
