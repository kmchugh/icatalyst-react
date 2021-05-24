import React, {useContext} from 'react';
import {ListItem, ListItemText} from '@material-ui/core';
import Icon from '@icatalyst/components/Icon';
import {makeStyles} from '@material-ui/styles';
import NavLinkAdapter from '../NavLinkAdapter';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch} from 'react-redux';
import * as Actions from 'app/store/actions';
import FuseNavBadge from './../FuseNavBadge';
import {SingularityContext} from '@icatalyst/components/Singularity';

const useStyles = makeStyles(theme => ({
  itemFn: ({nestedLevel})=>{
    return {
      height      : theme.spacing(5),
      width       : `calc(100% - ${theme.spacing(2)}px)`,
      borderRadius: `0 ${theme.spacing(2.5)}px ${theme.spacing(2.5)}px 0`,
      paddingRight: theme.spacing(2.5),
      paddingLeft : nestedLevel ? Math.min(theme.spacing(10), theme.spacing(5) + theme.spacing(2*nestedLevel)) : theme.spacing(3),
      color       : theme.palette.text.primary,
      cursor                     : 'pointer',
      textDecoration             : 'none!important',
      textTransform              : 'capitalize'
    };
  },
  item: {
    '&.active'                 : {
      backgroundColor            : theme.palette.secondary.main,
      color                      : theme.palette.secondary.contrastText + '!important',
      pointerEvents              : 'none',
      transition                 : 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1), border-left-width .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon'        : {
        color: 'inherit!important',
      },
      borderLeftWidth : theme.spacing(.5),
      borderColor : theme.palette.primary.main,
      borderStyle : 'solid'
    },
    '&.square, &.active.square': {
      width       : '100%',
      borderRadius: '0'
    },
    '& .list-item-icon'        : {
      maxWidth: theme.spacing(2)
    },
    '& .list-item-text'        : {}
  }
}));

function FuseNavVerticalItem(props)
{
  const dispatch = useDispatch();
  const singularityContext = useContext(SingularityContext);
  const {isInRole} = singularityContext;

  const classes = useStyles(props);
  const {item, active} = props;

  if ( !isInRole(item.auth) )
  {
    return null;
  }

  const visible = (item.visible === null || item.visible === undefined) ||
    (typeof item.visible === 'function' && item.visible());

  return visible && (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={clsx(classes.item, classes.itemFn, active)}
      onClick={() => dispatch(Actions.navbarCloseMobile())}
      exact={item.exact}
    >
      {item.icon && (
        <Icon className="list-item-icon text-16 flex-shrink-0 mr-16" color="action">{item.icon}</Icon>
      )}
      <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14 list-item-text-primary'}}/>
      {item.badge && (
        <FuseNavBadge badge={item.badge}/>
      )}
    </ListItem>
  );
}

FuseNavVerticalItem.propTypes = {
  item: PropTypes.shape(
    {
      id   : PropTypes.string.isRequired,
      badge   : PropTypes.object,
      exact   : PropTypes.bool,
      title: PropTypes.string,
      icon : PropTypes.string,
      url  : PropTypes.string,
      auth : PropTypes.array,
      visible : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
      ])
    }),
  nestedLevel : PropTypes.number,
  active : PropTypes.bool,
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = withRouter(React.memo(FuseNavVerticalItem));

export default NavVerticalItem;
