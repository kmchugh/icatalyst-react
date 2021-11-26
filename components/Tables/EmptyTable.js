import React from 'react';
import Icon from '@icatalyst/components/Icon';
import IconButton from '@icatalyst/components/IconButton';
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
      margin:theme.spacing(2)
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
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(4)
    },
    title : {
      marginBottom: theme.spacing(1),
    },
    info : {
      marginBottom: theme.spacing(1),
      textAlign: 'center',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    help : {

    },
    refreshButton : {
      marginTop: theme.spacing(2)
    }
  };
});

const EmptyTable = ({
  icon = 'fa search',
  title = 'No results found',
  action,
  help,
  onRefresh,
  className,
  showIcon = true,
})=>{
  const classes = useStyles();


  return (
    <div className={clsx(classes.root, className)}>
      {showIcon && <Icon className={clsx(classes.icon)}>{icon}</Icon>}
      <Typography variant="h4" className={clsx(classes.title)}>{title}</Typography>
      {
        action && <Typography variant="subtitle1" className={clsx(classes.info)}>{action}</Typography>
      }
      {
        help && <Typography variant="caption" className={clsx(classes.help)}>{help}</Typography>
      }
      {
        onRefresh && <IconButton
          className={clsx(classes.refreshButton)}
          title="refresh"
          icon="refresh"
          onClick={onRefresh}
        />
      }
    </div>
  );
};

EmptyTable.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  icon: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  help: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  onRefresh: PropTypes.func,
  showIcon : PropTypes.bool
};

export default React.memo(EmptyTable);
