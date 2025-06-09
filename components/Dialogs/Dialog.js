import React, {useEffect} from 'react';
import {Dialog as NativeDialog,
  AppBar, Typography, Slide
} from '@mui/material';
import IconButton from '../IconButton';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const TransitionFull = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const TransitionDialog = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Root = styled(NativeDialog)({

});
const AppBarStyle = styled(AppBar)(({ theme }) => ({
  paddingLeft: theme.spacingNum(2),
}));
const ContentWrapper = styled('div')({
  overflow : 'hidden',
  display: 'flex',
  flex: 1
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
    showTitle = true,
    titleVariant = 'default',
    classes,
    style,
    TransitionComponent,
  } = props;

  /*
  Workaround for accessibility issues with modal dialogs
  https://github.com/mui-org/material-ui/issues/19450
  */
  useEffect(() => {
    if (open) {
      document
        .getElementById('root')
        .setAttribute('aria-hidden', 'false');
    }
  }, [open]);

  let appBarColor = 'primary';
  if (titleVariant === 'flat') {
    appBarColor = 'transparent';
  }

  let titleTextColor = 'inherit';
  if (titleVariant === 'flat') {
    titleTextColor = 'primary';
  }

  let elevation = 1;
  if (titleVariant === 'flat') {
    elevation = 0;
  }

  return (
    <Root
      className={clsx(className)}
      open={Boolean(open)}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      onClose={()=>{
        onClose && onClose();
      }}
      aria-labelledby={title && 'alert-dialog-title'}
      aria-describedby={description && 'alert-dialog-description'}
      keepMounted
      classes={classes}
      onClick={(e)=>{e.stopPropagation();}}
      slotProps={{
        paper: { style },
        transition: { role: 'presentation' }
      }}
      slots={{
        transition: TransitionComponent || (fullScreen ? TransitionFull : TransitionDialog),
      }}
    >
      {showTitle && (
        <AppBarStyle
          position="static"
          color={appBarColor}
          elevation={elevation}
        >
          <div className={clsx('flex flex-1 p-8 sm:p-12 relative max-w-full')}>
            <div className="flex flex-1 flex-col items-start justify-center mr-16">
              <Typography
                id="alert-dialog-title"
                noWrap={true}
                className="text-16 sm:text-20 truncate max-w-sm"
                component="h1"
                color={titleTextColor}
              >
                {title}
              </Typography>

              { description &&
                (
                  <Typography
                    id="alert-dialog-description"
                    noWrap={true}
                    variant="caption"
                    color={titleTextColor}
                  >
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
                color={titleTextColor}
                onClick={onClose}
              />
            }
          </div>
        </AppBarStyle>
      )}

      <ContentWrapper>
        {children}
      </ContentWrapper>

    </Root>
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
  showTitle : PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  classes : PropTypes.object,
  titleVariant : PropTypes.oneOf([
    'default',
    'flat'
  ]),
  TransitionComponent : PropTypes.node,
  style : PropTypes.object
};

export default Dialog;
