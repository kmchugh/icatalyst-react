import React from 'react';
import {Dialog as NativeDialog,
  AppBar, Typography, Slide
} from '@material-ui/core';
import IconButton from '../IconButton';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const TransitionFull = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const TransitionDialog = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => {
  return {
    root : {
    },
    dialogDescription : {
      flex: '0 0 auto'
    },
    dialogAppBar: {
      paddingLeft: theme.spacing(2),
    },
    contentWrapper : {
      overflow : 'hidden',
      display: 'flex'
    }
  };
});


const Dialog = (props)=>{
  const {
    className,
    open, onClose,
    title, description,
    children,
    fullScreen = false,
    fullWidth = false,
    allowClose = true,
  } = props;
  const classes = useStyles(props);

  return (
    <NativeDialog
      className={clsx(classes.root, className)}
      open={open}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      onClose={onClose}
      aria-labelledby={title && 'alert-dialog-title'}
      aria-describedby={description && 'alert-dialog-description'}
      TransitionComponent={fullScreen ? TransitionFull : TransitionDialog}
      TransitionProps={{ role: 'presentation' }}
      keepMounted
    >
      <AppBar position="static" className={clsx(classes.dialogAppBar)}>
        <div className={clsx('flex flex-1 p-8 sm:p-12 relative max-w-full')}>
          <div className="flex flex-1 flex-col items-start justify-center mr-16">
            <Typography id="alert-dialog-title" noWrap={true} className="text-16 sm:text-20 truncate max-w-sm" component="h1">
              {title}
            </Typography>

            { description &&
              (
                <Typography id="alert-dialog-description" noWrap={true} variant="caption">
                  {description}
                </Typography>
              )
            }
          </div>

          {
            allowClose && <IconButton
              className="ml-16"
              size="small"
              title="Close"
              icon="close"
              onClick={onClose}
            />
          }
        </div>
      </AppBar>

      <div className={clsx(classes.contentWrapper)}>
        {children}
      </div>

    </NativeDialog>
  );
};

Dialog.propTypes = {
  open : PropTypes.bool,
  fullScreen : PropTypes.bool,
  fullWidth : PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  onClose : PropTypes.func.isRequired,
  allowClose : PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default Dialog;
