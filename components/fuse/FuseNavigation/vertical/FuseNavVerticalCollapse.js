import React, {useEffect, useState, useContext} from 'react';
import {Collapse, IconButton, ListItem, ListItemText} from '@mui/material';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import FuseNavVerticalGroup from './FuseNavVerticalGroup';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import FuseNavBadge from '../FuseNavBadge';
import FuseNavVerticalLink from './FuseNavVerticalLink';
import {SingularityContext} from '@icatalyst/components/Singularity';
import Icon from '@icatalyst/components/Icon';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';
import { createMuiStyles, cxMui } from '../../../../utilities';

const useStyles = createMuiStyles(theme => ({
  root: {
    padding : 0,
    '&.open': {
      backgroundColor: 'rgba(0,0,0,.08)'
    }
  },
  itemFn: ({nestedLevel})=>{
    return {
      height      : theme.spacingNum(5),
      width       : `calc(100% - ${theme.spacingNum(2)})`,
      borderRadius: `0 ${theme.spacingNum(2.5)} ${theme.spacingNum(2.5)} 0`,
      paddingRight: theme.spacingNum(2.5),
      paddingLeft : nestedLevel ? Math.min(theme.spacingNum(10), theme.spacingNum(5) + theme.spacingNum(2*nestedLevel)) : theme.spacingNum(3),
      color       : theme.palette.text.primary,
    };
  },
  item: {
    '&.square'  : {
      width       : '100%',
      borderRadius: '0'
    },
    '& .list-item-icon'        : {
      maxWidth: theme.spacingNum(2)
    },
  }
}));

function needsToBeOpened(location, item)
{
  return location && isUrlInChildren(item, location.pathname);
}

function isUrlInChildren(parent, url)
{
  if ( !parent.children )
  {
    return false;
  }

  for ( let i = 0; i < parent.children.length; i++ )
  {
    if ( parent.children[i].children )
    {
      if ( isUrlInChildren(parent.children[i], url) )
      {
        return true;
      }
    }

    if ( parent.children[i].url === url || url.includes(parent.children[i].url) )
    {
      return true;
    }
  }

  return false;
}

function FuseNavVerticalCollapse(props)
{
  const singularityContext = useContext(SingularityContext);
  const {isInRole} = singularityContext;
  const {t} = useContext(LocalizationContext);
  const {item, nestedLevel, active} = props;

  const classes = useStyles(props);

  const [open, setOpen] = useState(() => needsToBeOpened(props.location, props.item));


  useEffect(() => {
    if ( needsToBeOpened(props.location, props.item) )
    {
      setOpen(true);
    }
  }, [props.location, props.item]);

  function handleClick()
  {
    setOpen(!open);
  }

  if ( !isInRole(item.auth) )
  {
    return null;
  }

  const {skipLevel = false} = item;

  return skipLevel && item.children ? (
    <React.Fragment>
      {
        item.children.map((item) => (

          <React.Fragment key={item.id}>

            {item.type === 'group' && (
              <FuseNavVerticalGroup item={item} nestedLevel={nestedLevel} active={active}/>
            )}

            {item.type === 'collapse' && (
              <NavVerticalCollapse item={item} nestedLevel={nestedLevel} active={active}/>
            )}

            {item.type === 'item' && (
              <FuseNavVerticalItem item={item} nestedLevel={nestedLevel} active={active}/>
            )}

            {item.type === 'link' && (
              <FuseNavVerticalLink item={item} nestedLevel={nestedLevel} active={active}/>
            )}

          </React.Fragment>
        ))
      }
    </React.Fragment>
  ) : (
    <ul className={cxMui(classes.root, open && 'open')}>

      <ListItem
        className={cxMui(classes.item, classes.itemFn, active)}
        onClick={handleClick}
      >
        {item.icon && (
          <Icon color="action" className="list-item-icon text-16 flex-shrink-0 mr-16">{item.icon}</Icon>
        )}
        <ListItemText
          className="list-item-text"
          primary={t(item.title)} 
          classes={{primary: 'text-14'}}
        />
        {item.badge && (
          <FuseNavBadge className="mr-4" badge={item.badge}/>
        )}
        <IconButton
          aria-label={open ? 'collapse' : 'expand'}
          component="div"
          disableRipple
          className="w-16 h-16 p-0"
          size="large">
          <Icon className="text-16 arrow-icon" color="inherit">
            {open ? 'expand_less' : 'expand_more'}
          </Icon>
        </IconButton>
      </ListItem>

      {item.children && (
        <Collapse in={open} className="collapse-children">
          {
            item.children.map((item) => (

              <React.Fragment key={item.id}>

                {item.type === 'group' && (
                  <FuseNavVerticalGroup item={item} nestedLevel={nestedLevel + 1} active={active}/>
                )}

                {item.type === 'collapse' && (
                  <NavVerticalCollapse item={item} nestedLevel={nestedLevel + 1} active={active}/>
                )}

                {item.type === 'item' && (
                  <FuseNavVerticalItem item={item} nestedLevel={nestedLevel + 1} active={active}/>
                )}

                {item.type === 'link' && (
                  <FuseNavVerticalLink item={item} nestedLevel={nestedLevel + 1} active={active}/>
                )}

              </React.Fragment>
            ))
          }
        </Collapse>
      )}
    </ul>
  );
}

FuseNavVerticalCollapse.propTypes = {
  item: PropTypes.shape(
    {
      id      : PropTypes.string.isRequired,
      badge   : FuseNavBadge.type.propTypes.badge,
      title   : PropTypes.string,
      icon    : PropTypes.string,
      type    : PropTypes.string,
      children: PropTypes.array,
      auth : PropTypes.array,
      skipLevel : PropTypes.bool
    }),
  location: PropTypes.object,
  nestedLevel : PropTypes.number,
  active : PropTypes.bool
};
FuseNavVerticalCollapse.defaultProps = {};

const NavVerticalCollapse = withRouter(React.memo(FuseNavVerticalCollapse));

export default NavVerticalCollapse;
