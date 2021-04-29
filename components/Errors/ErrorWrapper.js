import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { Typography } from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Error from './Error';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      border: `thin solid ${theme.palette.error.dark}`,
      background: fade(theme.palette.error.main, .25),
      color: theme.palette.error.contrastText,
      width: '100%',
      position: 'relative!important',
      minHeight: '100%'
    },
    errorList: {
      margin: theme.spacing(2),
    },
    errorIcon: {
      marginRight: theme.spacing(2),
      color: theme.palette.error.main
    },
    errorTitle: {
      display: 'flex',
      alignItems: 'center'
    },
    error: {
      listStyle: 'circle',
      marginLeft: theme.spacing(3)
    },
    errorActionWrapper: {
      textAlign: 'center',
      margin: theme.spacing(2)
    }
  };
});


const ErrorComponent = ({errors, title, actionComponent})=>{
  if (!errors || errors.length === 0) {
    return null;
  }
  const classes = useStyles();

  return (
    <div className={clsx(classes.root)}>
      <div className={clsx(classes.errorTitle)}>
        <Icon className={clsx(classes.errorIcon)}>error</Icon>
        <Typography className="flex-shrink" variant="h5">
          {title}
        </Typography>
      </div>
      <ul className={clsx(classes.errorList)}>
        {
          errors.map(e=>{
            const message = e.message || e.toString();
            return (
              <li className={clsx(classes.error)} key={message}>
                <Error>{message || 'Unknown Error'}</Error>
              </li>
            );
          })
        }
      </ul>
      {
        <div className={clsx(classes.errorActionWrapper)}>
          {actionComponent}
        </div>
      }
    </div>
  );
};

ErrorComponent.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message : PropTypes.string.isRequired
    })
  ),
  title : PropTypes.string.isRequired,
  actionComponent : PropTypes.node
};

export default React.memo(ErrorComponent);
