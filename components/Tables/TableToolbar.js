import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@mui/material';
import IconButton from '../IconButton';
import Icon from '../Icon';
import {FuseAnimate} from '../fuse';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
import { createMuiStyles, cxMui } from '../../utilities';


const useStyles = createMuiStyles((theme) => {
  return {
    root: {
      paddingLeft: theme.spacingNum(2),
      paddingRight: theme.spacingNum(2),
      background: theme.palette.background.default,
      color: `${mostReadable(
        tinycolor(theme.palette.background.default),
        [
          theme.palette.text.secondary,
          theme.palette.primary.main,
        ], {}
      ).toHexString()}!important`,
    },
    titleWrapper : {
      flex : '1 1 0%',
      display : 'flex',
      alignItems : 'center',
      // [theme.breakpoints.down('sm')] : {
      //   display: 'none'
      // }
    },
    title : {
      textTransform : 'capitalize',
      marginLeft : theme.spacingNum(2),
    },
    inputWrapper : {
      flexGrow: 1,
      flexShrink: 1,
      display: 'none',
      overflow: 'hidden',
      [theme.breakpoints.up('sm')] : {
        display: 'flex'
      }
    },
    controlWrapper : {
      display: 'flex',
      flex : '1 1 0%',
      justifyContent: 'flex-end',
      alignItems: 'center',

      '& > *:first-child' : {
        borderLeft: 'none',
      },
    },
    actionWrapper : {
      paddingRight : theme.spacingNum(1),
      paddingLeft : theme.spacingNum(1),
      display: 'flex',
    },
    switchWrapper : {
      display: 'none',
      [theme.breakpoints.up('md')] : {
        display: 'flex'
      }
    },
    switchButton : {
    },
    switchButtonActive : {
    },
    actionButton : {
      marginRight: theme.spacingNum(1),
      background : theme.palette.primary.main,
      '&:hover' : {
        background : theme.palette.primary.light,
      },
      color : theme.palette.primary.contrastText
    },
    toolbar : {
      paddingLeft : theme.spacingNum(2),
      paddingRight : theme.spacingNum(1),
    },
    toolbarPrepend : {
      paddingLeft : 0,
      paddingRight : theme.spacingNum(1),
    }
  };
});

const TableToolbar = ({
  className,
  title,
  icon,
  inputComponent,
  switchComponent,
  actions,
  switches,
  PrependHeaderComponent
})=>{
  const classes = useStyles();

  return (
    <AppBar color="secondary" position="relative" className={cxMui(classes.root, className)}>
      <Toolbar className={cxMui(PrependHeaderComponent ? classes.toolbarPrepend : classes.toolbar)}>
        {
          PrependHeaderComponent
        }
        <div className={cxMui(classes.titleWrapper)}>
          {
            icon &&
            <Icon fontSize="large">{icon}</Icon>
          }
          { title &&
            <Typography variant="h5" color="inherit" className={cxMui(classes.title)}>
              {title}
            </Typography>
          }
        </div>

        <div className={cxMui(classes.inputWrapper)}>
          {inputComponent && inputComponent}
        </div>

        <div className={cxMui(classes.controlWrapper)}>
          <div className={cxMui(classes.actionWrapper)}>
            {
              actions && actions.map(({title, icon, onClick})=>(
                <FuseAnimate
                  key={title}
                  animation="transition.expandIn">
                  <IconButton
                    key={title}
                    className={cxMui(classes.actionButton)}
                    title={title}
                    onClick={onClick}
                    icon={icon}
                    size="large" />
                </FuseAnimate>
              ))
            }
          </div>

          <div className={cxMui(classes.switchWrapper)}>
            {switchComponent && switchComponent}
            {
              switches && switches.map(({title, icon, onClick, active})=>(
                <IconButton
                  key={title}
                  className={cxMui(classes.switchButton, active && classes.switchButtonActive)}
                  title={title}
                  onClick={onClick}
                  icon={icon}
                  size="large" />
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
  ),
  PrependHeaderComponent : PropTypes.node
};

export default React.memo(TableToolbar);
