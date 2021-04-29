import React, {useEffect, useState, useContext} from 'react';
import {Collapse, IconButton, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import FuseNavVerticalGroup from './FuseNavVerticalGroup';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import FuseNavBadge from '../FuseNavBadge';
import FuseNavVerticalLink from './FuseNavVerticalLink';
import {SingularityContext} from '@icatalyst/components/Singularity';
import Icon from '@icatalyst/components/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    padding : 0,
    '&.open': {
      backgroundColor: 'rgba(0,0,0,.08)'
    }
  },
  itemFn: ({nestedLevel})=>{
    return {
      height      : theme.spacing(5),
      width       : `calc(100% - ${theme.spacing(2)}px)`,
      borderRadius: `0 ${theme.spacing(2.5)}px ${theme.spacing(2.5)}px 0`,
      paddingRight: theme.spacing(2.5),
      paddingLeft : nestedLevel ? Math.min(theme.spacing(10), theme.spacing(5) + theme.spacing(2*nestedLevel)) : theme.spacing(3),
      color       : theme.palette.text.primary,
    };
  },
  item: {
    '&.square'  : {
      width       : '100%',
      borderRadius: '0'
    },
    '& .list-item-icon'        : {
      maxWidth: theme.spacing(2)
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

  return (
    <ul className={clsx(classes.root, open && 'open')}>

      <ListItem
        button
        className={clsx(classes.item, classes.itemFn, active)}
        onClick={handleClick}
      >
        {item.icon && (
          <Icon color="action" className="list-item-icon text-16 flex-shrink-0 mr-16">{item.icon}</Icon>
        )}
        <ListItemText className="list-item-text" primary={item.title} classes={{primary: 'text-14'}}/>
        {item.badge && (
          <FuseNavBadge className="mr-4" badge={item.badge}/>
        )}
        <IconButton disableRipple className="w-16 h-16 p-0">
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
      auth : PropTypes.array
    }),
  location: PropTypes.object,
  nestedLevel : PropTypes.number,
  active : PropTypes.bool
};
FuseNavVerticalCollapse.defaultProps = {};

const NavVerticalCollapse = withRouter(React.memo(FuseNavVerticalCollapse));

export default NavVerticalCollapse;
