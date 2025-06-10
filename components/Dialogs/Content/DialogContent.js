import React, {useImperativeHandle} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import {DialogContent as NativeContent,
  DialogActions, Divider,
  Button
} from '@mui/material';
import Icon from '../../Icon';
import {useDispatch} from 'react-redux';
import * as Actions from '../../../store/actions/dialog.actions';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { styled } from '@mui/material/styles';


const Root = styled('div')(() => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const NativeContentStyle = styled(NativeContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: mostReadable(
      tinycolor(theme.palette.background.paper),
      [theme.palette.secondary.light, theme.palette.secondary.dark],
      {}
    ).toHexString(),
  },
}));

const DialogActionsStyle = styled(DialogActions)(() => ({}));

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

  const dispatch = useDispatch();

  const onCloseHandler = ((e)=>{
    dispatch(Actions.closeDialog());
    onClose && onClose(e);
  });

  useImperativeHandle(ref, () => ({
    closeDialog: onCloseHandler
  }));


  return (
    <Root className={clsx(className)} style={style}>
      <NativeContentStyle component="div" >
        {children}
      </NativeContentStyle>

      {
        (actions || !hideCloseButton) && (
          <>
            <Divider variant="middle"/>

            <DialogActionsStyle >

              {
                actions && actions.map((action)=>(
                  <Button
                    key={action.key || action.title}
                    className={clsx(action.className)}
                    color={action.color || 'primary'}
                    startIcon={action.icon && (
                      <Icon>{action.icon}</Icon>
                    )}
                    variant={buttonVariant}
                    size={buttonSize}
                    disabled={
                      updating || (
                        typeof action.disabled === 'function' ?
                          action.disabled() : action.disabled
                      )
                    }
                    onClick={action.onClick}>
                    {action.title}
                  </Button>
                ))
              }

              { !hideCloseButton &&
                (
                  <Button
                    className={clsx(closeButtonClassName)}
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

            </DialogActionsStyle>
          </>
        )
      }
    </Root>
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
      disabled : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
      ]),
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
