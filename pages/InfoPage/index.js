import React from 'react';
import Icon from '../../components/Icon';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.background.default,
      height: '100%',
      margin:theme.spacing(2),
      alignSelf: 'center',

      ['& > *'] : {
        marginBottom : theme.spacing(2)
      }
    },
    link : {
      color: theme.palette.primary.color
    },
    icon : {

      width: theme.spacing(12),
      height: theme.spacing(12),
      fontSize: theme.spacing(12),

      [theme.breakpoints.up('md')]: {
        width: theme.spacing(16),
        height: theme.spacing(16),
        fontSize: theme.spacing(16),
      },
      marginBottom: theme.spacing(4)
    },
    title : {
      marginBottom: theme.spacing(1),
    },
    info : {
      marginBottom: theme.spacing(1),
    },
    action : {

    }
  };
});

const DefaultAccessComponent = ({
  icon = 'fa info',
  title = 'Title',
  info = 'info text',
  action = null
})=>{
  const classes = useStyles();
  const infoText = typeof info === 'string';
  const actionText = typeof action === 'string';

  return (
    <div className={clsx(classes.root, 'max-w-md text-center')}>
      <Icon color="primary" className={clsx(classes.icon)}>{icon}</Icon>
      <Typography variant="h4" component="h1" className={clsx(classes.title)}>{title}</Typography>
      {
        infoText ? (
          <Typography variant="subtitle1" component="div" className={clsx(classes.info)}>
            {info}
          </Typography>
        ) : info
      }

      {
        actionText ? (
          <Typography variant="caption" component="div" className={clsx(classes.action)}>
            {action}
          </Typography>
        ) : action
      }
    </div>
  );
};

DefaultAccessComponent.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
};

export default DefaultAccessComponent;
