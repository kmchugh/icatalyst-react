import React, {useContext} from 'react';
import {ListSubheader} from '@material-ui/core';
import {Icon} from '@icatalyst/components';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import FuseNavVerticalCollapse from './FuseNavVerticalCollapse';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import FuseNavVerticalLink from './FuseNavVerticalLink';
import {SingularityContext} from '@icatalyst/components/Singularity';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';

const useStyles = makeStyles((theme)=>{
  return {
    itemFn: ({nestedLevel})=>{
      return {
        height      : theme.spacing(5),
        width       : `calc(100% - ${theme.spacing(2)}px)`,
        borderRadius: `0 ${theme.spacing(2.5)}px ${theme.spacing(2.5)}px 0`,
        paddingRight: theme.spacing(2.5),
        paddingLeft : nestedLevel ? Math.min(theme.spacing(10), theme.spacing(5) + theme.spacing(2*nestedLevel)) : theme.spacing(3),
      };
    },
    item: {
    },
    icon : {
      maxWidth: theme.spacing(2),
      width: '0!important',
      transition   : theme.transitions.create(['width'], {
        easing  : theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
      }),
    }
  };
});

function FuseNavVerticalGroup(props)
{
  const singularityContext = useContext(SingularityContext);
  const {isInRole} = singularityContext;
  const {t} = useContext(LocalizationContext);

  const classes = useStyles(props);

  const {item, nestedLevel, active} = props;

  if ( !isInRole(item.auth) ){
    return null;
  }

  const {skipLevel = false} = item;

  return skipLevel && item.children ? (
    <React.Fragment>
      {
        item.children.map((item) => (

          <React.Fragment key={item.id}>

            {item.type === 'group' && (
              <NavVerticalGroup item={item} nestedLevel={nestedLevel} active={active}/>
            )}

            {item.type === 'collapse' && (
              <FuseNavVerticalCollapse item={item} nestedLevel={nestedLevel} active={active}/>
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
    <React.Fragment>

      <ListSubheader disableSticky={true} className={clsx(classes.item, classes.itemFn, 'list-subheader flex items-center', item.icon ? 'icon' : 'iconless')}>
        {item.icon && (
          <Icon color="action" className={clsx(classes.icon, 'text-16 flex-shrink-0 list-subheader-icon')}>{item.icon}</Icon>
        )}
        <span className="list-subheader-text uppercase text-12">
          {t(item.title)}
        </span>
      </ListSubheader>

      {item.children && (
        <React.Fragment>
          {
            item.children.map((item) => (

              <React.Fragment key={item.id}>

                {item.type === 'group' && (
                  <NavVerticalGroup item={item} nestedLevel={nestedLevel} active={active}/>
                )}

                {item.type === 'collapse' && (
                  <FuseNavVerticalCollapse item={item} nestedLevel={nestedLevel} active={active}/>
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
      )}
    </React.Fragment>
  );
}

FuseNavVerticalGroup.propTypes = {
  item: PropTypes.shape(
    {
      id      : PropTypes.string.isRequired,
      title   : PropTypes.string,
      children: PropTypes.array,
      type    : PropTypes.string,
      auth : PropTypes.array,
      icon : PropTypes.string,
      skipLevel : PropTypes.bool
    }),
  nestedLevel : PropTypes.number,
  active : PropTypes.bool,
};

FuseNavVerticalGroup.defaultProps = {};

const NavVerticalGroup = withRouter(React.memo(FuseNavVerticalGroup));

export default NavVerticalGroup;
