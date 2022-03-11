import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/styles';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Icon from '../Icon';
import DropdownMenu from '../Menus/DropdownMenu';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      overflow : 'hidden',
      display : 'flex',
      flexDirection : 'column'
    },
    contentHeader : {
      flexShrink : 0,
      flexGrow : 0,
      display: 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      minHeight : theme.spacing(3)
    },
    content : {
      overflow : 'hidden',
      flexGrow : 1
    },
    dragHandle : {
      overflow : 'hidden',
      cursor : 'pointer',
      color : 'transparent',
      marginLeft : theme.spacing(.5),
      marginRight : theme.spacing(1),
    },
    titleWrapper : {
      display: 'flex',
      flexDirection : 'row',
      flexGrow : 1,
      flexShrink : 1,
      alignItems : 'center',
      overflow: 'hidden',
      minHeight: theme.spacing(4)
    },
    title : {
      fontWeight: 'bold',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop : theme.spacing(.5)
    },
  };
});

const GridItem = React.forwardRef(({
  className,
  style = {},
  children,
  variant = 'default',
  title,
  menuTitle,
  menu,
  icon,
  iconColor,
  showChrome = true,
  ...rest
}, ref)=>{
  const styles = useStyles();
  const theme = useTheme();

  const isCompact = variant === 'compact';

  return (
    <Paper
      ref={ref}
      className={clsx(styles.root, className)}
      style={{...style}}
      {...rest}
    >
      {showChrome && (
        <div className={clsx(styles.contentHeader)}>
          <span className={clsx(styles.dragHandle, 'dragHandle')}>
            <Icon
              size={isCompact ? 'small' : 'medium'}
              title="drag"
              component="div"
              style={{
                // This is a fix for the browser updates for scrolling
                pointerEvents : 'none',
                position: 'absolute',
              }}
              color="secondary"
            >
              drag_indicator
            </Icon>
            tttt
          </span>
          <div className={clsx(styles.titleWrapper)}>
            {
              React.isValidElement(title) ?
                title :
                <Tooltip title={title || ''}>
                  <Typography
                    variant="subtitle1"
                    style={isCompact ? {
                      fontSize : theme.spacing(1.5)
                    } : {
                      fontSize : theme.spacing(2),
                    }}
                    className={clsx(styles.title)}
                    noWrap
                    component="h2"
                  >
                    {title}
                  </Typography>
                </Tooltip>
            }
            {icon && (
              <Icon
                color={iconColor}
                size={isCompact ? 'small' : 'medium'}>
                {icon}
              </Icon>
            )}
          </div>
          { menu && (
            <DropdownMenu
              menu={[]}
              size={isCompact ? 'small' : 'medium'}
              title={menuTitle}
            />
          )}
        </div>
      )}
      <div className={clsx(styles.content)}>
        {children}
      </div>
    </Paper>
  );
});

GridItem.displayName='GridItem';
GridItem.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  children : PropTypes.node,
  gridItemProps : PropTypes.object,
  variant : PropTypes.oneOf([
    'default',
    'compact'
  ]),
  title : PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  icon : PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  iconColor : PropTypes.string,
  menuTitle : PropTypes.string,
  menu : PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        title : PropTypes.string.isRequired,
        subtitle : PropTypes.string,
        key : PropTypes.string,
        onClick : PropTypes.func,
        icon : PropTypes.string,
        disabled : PropTypes.bool,
        selected : PropTypes.bool,
        iconColor : PropTypes.string,
        menu : PropTypes.array
      })
    ])
  ),
  showChrome : PropTypes.bool
};

export default GridItem;
