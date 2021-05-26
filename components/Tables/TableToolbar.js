import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import IconButton from '../IconButton';
import Icon from '../Icon';
import {FuseAnimate} from '../fuse';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    titleWrapper : {
      flex : '1 1 0%',
      display : 'flex',
      alignItems : 'center',
      [theme.breakpoints.down('sm')] : {
        display: 'none'
      }
    },
    title : {
      textTransform : 'capitalize',
      marginLeft : theme.spacing(2),
    },
    inputWrapper : {
      flexGrow: 1,
      overflow: 'hidden',
      [theme.breakpoints.up('lg')]: {
        flex: '1 1 0%',
      },
      [theme.breakpoints.down('sm')] : {
        display: 'none'
      }
    },
    controlWrapper : {
      display: 'flex',
      flex : '1 1 0%',
      justifyContent: 'flex-end',
      alignItems: 'center',

      '& > *:first-child' : {
        borderLeft: 'none',
      }
    },
    actionWrapper : {
      paddingRight : theme.spacing(1),
      paddingLeft : theme.spacing(1),
      display: 'flex',
    },
    switchWrapper : {
      display: 'flex',
    },
    switchButton : {
      color : theme.palette.primary.light
    },
    switchButtonActive : {
      color : 'inherit'
    },
    actionButton : {
      marginRight: theme.spacing(1),
      background : theme.palette.primary.dark,

      '&:hover' : {
        background : theme.palette.primary.main,
      }
    },
  };
});

const TableToolbar = ({
  className,
  title,
  icon,
  inputComponent,
  switchComponent,
  actions,
  switches
})=>{
  const classes = useStyles();

  return (
    <AppBar color="secondary" position="relative" className={clsx(classes.root, className)}>
      <Toolbar className="pl-16 pr-8">
        <div className={clsx(classes.titleWrapper)}>
          {
            icon &&
            <Icon fontSize="large">{icon}</Icon>
          }
          { title &&
            <Typography variant="h5" color="inherit" className={clsx(classes.title)}>
              {title}
            </Typography>
          }
        </div>

        <div className={clsx(classes.inputWrapper)}>
          {inputComponent && inputComponent}
        </div>

        <div className={clsx(classes.controlWrapper)}>
          <div className={clsx(classes.actionWrapper)}>
            {
              actions && actions.map(({title, icon, onClick})=>(
                <FuseAnimate
                  key={title}
                  animation="transition.expandIn">
                  <IconButton
                    key={title}
                    className={clsx(classes.actionButton)}
                    title={title}
                    onClick={onClick}
                    icon={icon}
                  />
                </FuseAnimate>
              ))
            }
          </div>

          <div className={clsx(classes.switchWrapper)}>
            {switchComponent && switchComponent}
            {
              switches && switches.map(({title, icon, onClick, active})=>(
                <IconButton
                  key={title}
                  className={clsx(classes.switchButton, active && classes.switchButtonActive)}
                  title={title}
                  onClick={onClick}
                  icon={icon}
                />
              ))
            }
          </div>
        </div>

      </Toolbar>
    </AppBar>
  );
};


TableToolbar.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  title : PropTypes.string,
  icon : PropTypes.string,
  inputComponent : PropTypes.node,
  switchComponent : PropTypes.node,
  actions : PropTypes.arrayOf(
    PropTypes.shape({
      title : PropTypes.string,
      icon : PropTypes.string,
      onClick : PropTypes.func
    })
  ),
  switches : PropTypes.arrayOf(
    PropTypes.shape({
      title : PropTypes.string,
      icon : PropTypes.string,
      onClick : PropTypes.func,
      active : PropTypes.bool
    })
  )
};

export default React.memo(TableToolbar);
