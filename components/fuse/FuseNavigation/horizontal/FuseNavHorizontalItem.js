import React from 'react';
import {Icon, ListItem, ListItemText} from '@mui/material';
import NavLinkAdapter from '../NavLinkAdapter';
import FuseUtils from '@icatalyst/components/fuse/FuseUtils';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/store/actions';
import FuseNavBadge from './../FuseNavBadge';
import {styled} from '@mui/styles';

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  minHeight          : 48,
  '&.active'         : {
    backgroundColor            : theme.palette.secondary.main,
    color                      : theme.palette.secondary.contrastText + '!important',
    pointerEvents              : 'none',
    '& .list-item-text-primary': {
      color: 'inherit'
    },
    '& .list-item-icon'        : {
      color: 'inherit'
    }
  },
  '& .list-item-icon': {},
  '& .list-item-text': {
    padding: '0 0 0 16px'
  },
  color              : theme.palette.text.primary,
  textDecoration     : 'none!important',
  '&.dense'          : {
    padding            : '8px 12px 8px 12px',
    minHeight          : 40,
    '& .list-item-text': {
      padding: '0 0 0 8px'
    }
  }
}));


function FuseNavHorizontalItem(props)
{
  const dispatch = useDispatch();
  const userRole = useSelector(({icatalyst}) => icatalyst.auth.user.role);
  const {item, dense} = props;

  if ( !FuseUtils.hasPermission(item.auth, userRole) )
  {
    return null;
  }

  return (
    <ListItemStyle
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={clsx('list-item', dense && 'dense')}
      onClick={() => dispatch(Actions.navbarCloseMobile())}
      exact={item.exact}
    >
      {item.icon && (
        <Icon className="list-item-icon text-16 flex-shrink-0" color="action">{item.icon}</Icon>
      )}
      <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14 list-item-text-primary'}}/>
      {item.badge && (
        <FuseNavBadge className="ml-8" badge={item.badge}/>
      )}
    </ListItemStyle>
  );
}

FuseNavHorizontalItem.propTypes = {
  item: PropTypes.shape(
    {
      id   : PropTypes.string.isRequired,
      badge   : PropTypes.object,
      exact : PropTypes.bool,
      title: PropTypes.string,
      icon : PropTypes.string,
      url  : PropTypes.string,
      auth : PropTypes.array
    }),
  dense : PropTypes.bool
};

FuseNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(React.memo(FuseNavHorizontalItem));

export default NavHorizontalItem;
