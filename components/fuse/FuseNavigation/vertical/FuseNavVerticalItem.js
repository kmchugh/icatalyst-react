import React, {useContext} from 'react';
import {ListItem, ListItemText} from '@mui/material';
import Icon from '@icatalyst/components/Icon';
import NavLinkAdapter from '../NavLinkAdapter';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch} from 'react-redux';
import * as Actions from 'app/store/actions';
import FuseNavBadge from './../FuseNavBadge';
import {SingularityContext} from '@icatalyst/components/Singularity';
import {mostReadable} from '@ctrl/tinycolor';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';
import { createMuiStyles, cxMui } from '../../../../utilities';

const useStyles = createMuiStyles((theme) => {

  const activeBackground = theme.palette.navigation_active_background ?
    theme.palette.navigation_active_background.main :
    mostReadable(
      theme.palette.background.default, [
        theme.palette.secondary.light,
        theme.palette.secondary.main,
        theme.palette.secondary.dark
      ]);

  const activeText = mostReadable(
    activeBackground, [
      theme.palette.primary.main,
      theme.palette.secondary.contrastText,
      theme.palette.primary.contrastText,
    ]);

  return {
    itemFn: ({nestedLevel})=>{
      return {
        height      : theme.spacingNum(5),
        width       : `calc(100% - ${theme.spacingNum(2)})`,
        borderRadius: `0 ${theme.spacingNum(2.5)} ${theme.spacingNum(2.5)} 0`,
        paddingRight: theme.spacingNum(2.5),
        paddingLeft : nestedLevel ? Math.min(theme.spacingNum(10), theme.spacingNum(5) + theme.spacingNum(2*nestedLevel)) : theme.spacingNum(3),
        color       : theme.palette.text.primary,
        cursor                     : 'pointer',
        textDecoration             : 'none!important',
        textTransform              : 'capitalize'
      };
    },
    item: {
      '&.active'                 : {
        backgroundColor            : activeBackground,
        fontWeight                 : 'bold',
        color                      : `${activeText}!important`,
        transition                 : 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1), border-left-width .15s cubic-bezier(0.4,0.0,0.2,1)',
        '& .list-item-text-primary': {
          color: 'inherit'
        },
        '& .list-item-icon'        : {
          color: 'inherit!important',
        },
        borderLeftWidth : theme.spacingNum(.5),
        borderColor : theme.palette.primary.main,
        borderStyle : 'solid'
      },
      '&.square, &.active.square': {
        width       : '100%',
        borderRadius: '0'
      },
      '& .list-item-icon'        : {
        maxWidth: theme.spacingNum(2)
      },
      '& .list-item-text'        : {}
    }
  };
});

function FuseNavVerticalItem(props)
{
  const dispatch = useDispatch();
  const singularityContext = useContext(SingularityContext);
  const {isInRole} = singularityContext;
  const {t} = useContext(LocalizationContext);

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
      // button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={cxMui(classes.item, classes.itemFn, active)}
      onClick={() => dispatch(Actions.navbarCloseMobile())}
      exact={item.exact}
    >
      {item.icon && (
        <Icon className="list-item-icon text-16 flex-shrink-0 mr-16" color="action">
          {item.icon}
        </Icon>
      )}
      <ListItemText
        className="list-item-text"
        primary={t(item.title)}
        classes={{primary: 'text-14 list-item-text-primary'}}
        primaryTypographyProps={{
          noWrap : true
        }}
      />
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
