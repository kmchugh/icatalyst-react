import React, {useImperativeHandle} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {DialogContent as NativeContent,
  DialogActions, Divider,
  Button
} from '@material-ui/core';
import Icon from '../../Icon';
import {useDispatch} from 'react-redux';
import * as Actions from '../../../store/actions/dialog.actions';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme) => {
  return {
    root : {
      overflow : 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    contentWrapper : {
      display: 'flex',
      flexDirection: 'column',
      '&::-webkit-scrollbar-thumb' : {
        backgroundColor: `${mostReadable(
          tinycolor(theme.palette.background.paper),
          [
            theme.palette.secondary.light,
            theme.palette.secondary.dark,
          ], {}
        ).toHexString()}`,
      }
    },
    actionWrapper : {

    }
  };
});

const DialogContent = React.forwardRef(({
  actions,
  closeText = 'Cancel',
  closeIcon = 'close',
  closeButtonClassName,
  hideCloseButton,
  updating,
  onClose,
  buttonVariant = 'contained',
  buttonSize = 'medium',
  className,
  children,
  style
}, ref) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const onCloseHandler = ((e)=>{
    dispatch(Actions.closeDialog());
    onClose && onClose(e);
  });

  useImperativeHandle(ref, () => ({
    closeDialog: onCloseHandler
  }));


  return (
    <div className={clsx(classes.root, className)} style={style}>
      <NativeContent component="div" className={clsx(classes.contentWrapper)}>
        {children}
      </NativeContent>

      {
        (actions || !hideCloseButton) && (
          <>
            <Divider variant="middle"/>

            <DialogActions className={clsx(classes.actionWrapper)}>

              {
                actions && actions.map((action)=>(
                  <Button
                    key={action.key || action.title}
                    className={clsx(classes.actionButton, action.className)}
                    color={action.color || 'primary'}
                    startIcon={action.icon && (
                      <Icon>{action.icon}</Icon>
                    )}
                    variant={buttonVariant}
                    size={buttonSize}
                    disabled={action.disabled || updating}
                    onClick={action.onClick}>
                    {action.title}
                  </Button>
                ))
              }

              { !hideCloseButton &&
                (
                  <Button
                    className={clsx(classes.actionButton, closeButtonClassName)}
                    color="secondary"
                    startIcon={closeIcon && (
                      <Icon>{closeIcon}</Icon>
                    )}
                    variant={buttonVariant}
                    size={buttonSize}
                    disabled={updating}
                    onClick={onCloseHandler}>
                    {closeText}
                  </Button>
                )
              }

            </DialogActions>
          </>
        )
      }
    </div>
  );
});

DialogContent.displayName = 'DialogContent';
DialogContent.propTypes = {
  buttonVariant : PropTypes.oneOf([
    'contained',
    'outlined',
    'text'
  ]),
  buttonSize : PropTypes.oneOf([
    'large',
    'medium',
    'small'
  ]),
  onClose : PropTypes.func,
  updating : PropTypes.bool,
  hideCloseButton : PropTypes.bool,
  closeButtonClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  closeText : PropTypes.string,
  closeIcon : PropTypes.string,
  actions : PropTypes.arrayOf(
    PropTypes.shape({
      key : PropTypes.string,
      color : PropTypes.oneOf([
        'default',
        'secondary',
        'primary',
        'inherit'
      ]),
      disabled : PropTypes.bool,
      onClick : PropTypes.func,
      autoFocus : PropTypes.bool,
      icon : PropTypes.string,
      title : PropTypes.string,
      className : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ])
    })
  ),
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  style : PropTypes.object,
};



export default DialogContent;
