import React from 'react';
import {Snackbar, IconButton, Icon, SnackbarContent} from '@mui/material';
import {green, amber, blue} from '@mui/material/colors';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/store/actions';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles(theme => ({
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
    <Snackbar
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
        className={cxMui(classes[options.variant])}
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
    </Snackbar>
  );
}

export default React.memo(FuseMessage);
