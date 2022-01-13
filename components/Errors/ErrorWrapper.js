import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { Typography } from '@material-ui/core';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import Error from './Error';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';


const useStyles = makeStyles((theme) => {
  const fadedBackground = alpha(theme.palette.error.light, .45);
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      border: `thin solid ${theme.palette.error.dark}`,
      backgroundColor: fadedBackground,
      color: `${mostReadable(
        tinycolor(fadedBackground),
        [
          theme.palette.primary.main,
          theme.palette.secondary.main,
        ], {}
      ).toHexString()}`,
      width: '100%',
      position: 'relative!important',
      minHeight: '100%'
    },
    errorList: {
      margin: theme.spacing(2),
    },
    errorIcon: {
      marginRight: theme.spacing(2),
      color: `${mostReadable(
        tinycolor(fadedBackground),
        [
          theme.palette.error.main,
          theme.palette.error.dark,
        ], {}
      ).toHexString()}`
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


const ErrorComponent = ({errors,
  title,
  actionComponent,
  className,
  role = 'alert'
})=>{
  if (!errors || errors.length === 0) {
    return null;
  }
  const classes = useStyles();
  return (
    <div role={role} aria-atomic={true} className={clsx(classes.root, className)}>
      {title &&
        (
          <div className={clsx(classes.errorTitle)}>
            <Icon className={clsx(classes.errorIcon)}>error</Icon>
            <Typography className="flex-shrink" variant="h5" component="h1">
              {title}
            </Typography>
          </div>
        )
      }
      {
        process.env.NODE_ENV !== 'production' && <ul className={clsx(classes.errorList)}>
          {
            errors.filter((e, index, self)=>{
              return self.findIndex((error)=>error.message === e.message) === index;
            }).map(e=>{
              const message = e.message || e.toString();
              return (
                <li className={clsx(classes.error)} key={message}>
                  <Error>{message || 'Unknown Error'}</Error>
                </li>
              );
            })
          }
        </ul>
      }
      {
        actionComponent && <div className={clsx(classes.errorActionWrapper)}>
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
  title : PropTypes.string,
  actionComponent : PropTypes.node,
  role : PropTypes.string,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default React.memo(ErrorComponent);
