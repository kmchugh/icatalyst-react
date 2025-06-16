import React from 'react';
import {Snackbar, IconButton, Icon, SnackbarContent} from '@mui/material';
import {green, amber, blue} from '@mui/material/colors';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import * as Actions from 'app/store/actions';
import {makeStyles,styled} from '@mui/styles';

const useStyles = makeStyles(theme => ({
  root   : {},
  success: {
    backgroundColor: green[600],
    color          : '#FFFFFF'
  },
  error  : {
    backgroundColor: theme.palette.error.dark,
    color          : theme.palette.getContrastText(theme.palette.error.dark)
  },
  info   : {
    backgroundColor: blue[600],
    color          : '#FFFFFF'
  },
  warning: {
    backgroundColor: amber[600],
    color          : '#FFFFFF'
  }
}));
const Root = styled(Snackbar)(() => ({}));

// const Success = styled('div')(() => ({
//    backgroundColor: green[600],
//    color          : '#FFFFFF'
// }));

// const Error = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.error.dark,
//   color          : theme.palette.getContrastText(theme.palette.error.dark)
// }));

// const Info = styled('div')(() => ({
//   backgroundColor: blue[600],
//   color          : '#FFFFFF'
// }));

// const Warning = styled('div')(() => ({
//   backgroundColor: amber[600],
//   color          : '#FFFFFF'
// }));

const variantIcon = {
  success: 'check_circle',
  warning: 'warning',
  error  : 'error_outline',
  info   : 'info'
};

function FuseMessage()
{
  const dispatch = useDispatch();
  const state = useSelector(({icatalyst}) => icatalyst.message.state);
  const options = useSelector(({icatalyst}) => icatalyst.message.options);

  const classes = useStyles();

  return (
    <Root
      {...options}
      open={state}
      onClose={() => dispatch(Actions.hideMessage())}
      classes={{
        root: classes.root
      }}
      ContentProps={{
        variant        : 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div'
        }
      }}
    >
      <SnackbarContent
        className={clsx(classes[options.variant])}
        message={
          <div className="flex items-center">
            {variantIcon[options.variant] && (
              <Icon className="mr-8" color="inherit">{variantIcon[options.variant]}</Icon>
            )}
            {options.message}
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(Actions.hideMessage())}
            size="large">
            <Icon>close</Icon>
          </IconButton>
        ]}
      />
    </Root>
  );
}

export default React.memo(FuseMessage);
