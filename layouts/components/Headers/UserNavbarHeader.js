import React, {useContext} from 'react';
import {AppBar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import UserRoles from '@icatalyst/components/UserRoles';
import Avatar from '@icatalyst/components/Avatar';
import {SingularityContext} from '@icatalyst/components/Singularity';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root  : {
    '&.user': {
      '& .username, & .role': {
        transition: theme.transitions.create(['opacity', 'line-height', 'margin', 'padding'], {
          duration: theme.transitions.duration.shortest,
          easing  : theme.transitions.easing.easeInOut
        })
      }
    }
  },
  username : {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
    maxWidth : '100%'
  },
  avatar: {
    width     : theme.spacing(10),
    height    : theme.spacing(10),
    position  : 'absolute',
    top       : theme.spacing(11.5),
    left      : '50%',
    transform : 'translateX(-50%)',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing  : theme.transitions.easing.easeInOut,
    }),
  }
}));

function UserNavbarHeader({className})
{
  const singularityContext = useContext(SingularityContext);
  const {user} = singularityContext;

  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      classes={{root: classes.root}}
      className={clsx('user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0', className)}
    >
      <Typography noWrap={true} className={clsx(classes.username, 'username text-16 whitespace-no-wrap')} color="inherit">{user && user.displayname}</Typography>
      <UserRoles className="role min-h-16 text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit"/>

      <Avatar
        reverse
        className={clsx(classes.avatar, 'avatar')}
        alt={(user && user.displayname) || 'user profile image'}
        src={user && user.profileimageuri}
      />
    </AppBar>
  );
}

UserNavbarHeader.propTypes = {
  className : PropTypes.string
};


export default UserNavbarHeader;
