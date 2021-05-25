import React from 'react';
import { FuseScrollbars } from '../fuse';
import {Dialog, Slide, Typography, AppBar, Toolbar} from '@material-ui/core';
import Icon from '../Icon';
import IconButton from '../IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSwipeable } from 'react-swipeable';
import {useDispatch, useSelector} from 'react-redux';
import {closeUserSettings} from '../../store/actions/settings.actions';
import {SettingsView} from '../Settings';

const Transition = React.forwardRef(function Transition(props, ref) {
  const theme = useTheme();
  return <Slide direction={theme.direction === 'ltr' ? 'left' : 'right'} ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  button: {
    minWidth: 40,
    width: 40,
    height: 40,
    margin: 0
  },
  dialogPaper: {
    position: 'fixed',
    width: 380,
    maxWidth: '90vw',
    backgroundColor: theme.palette.background.paper,
    top: 0,
    height: '100%',
    minHeight: '100%',
    bottom: 0,
    right: 0,
    margin: 0,
    zIndex: 1000,
    borderRadius: 0
  },
  titleBar: {
  },
  toolBar: {
    flexGrow: 1
  },
  toolBarTitle: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2)
  },
  content : {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));

function SessionPanel() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const settings = useSelector(({icatalyst}) => icatalyst.settings.userSettingsView);
  const {open} = settings;

  const handlerOptions = {
    onSwipedLeft: () => {
      return open && theme.direction === 'rtl' && handleClose();
    },
    onSwipedRight: () => {
      return open && theme.direction === 'ltr' && handleClose();
    }
  };

  const settingsHandlers = useSwipeable(handlerOptions);

  const handleClose = () => {
    dispatch(closeUserSettings());
  };

  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        aria-labelledby="settings-panel"
        aria-describedby="settings"
        open={open}
        keepMounted
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        classes={{
          paper: clsx(classes.dialogPaper, 'shadow-lg')
        }}
        {...settingsHandlers}
      >
        <FuseScrollbars>
          <AppBar position="relative" className={clsx(classes.titleBar)}>
            <Toolbar className={clsx(classes.toolBar)}>
              <Icon>settings</Icon>
              <Typography className={clsx(classes.toolBarTitle)} variant="h6">
                Settings
              </Typography>
              <IconButton title="close" icon="close" onClick={handleClose}/>
            </Toolbar>
          </AppBar>

          <div className={clsx(classes.content)}>
            <SettingsView/>
          </div>
        </FuseScrollbars>
      </Dialog>
    </div>
  );
}

export default React.memo(SessionPanel);
