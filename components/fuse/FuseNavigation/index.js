import React from 'react';
import {Divider, List} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FuseNavVerticalGroup from './vertical/FuseNavVerticalGroup';
import FuseNavVerticalCollapse from './vertical/FuseNavVerticalCollapse';
import FuseNavVerticalItem from './vertical/FuseNavVerticalItem';
import FuseNavVerticalLink from './vertical/FuseNavVerticalLink';
import FuseNavHorizontalGroup from './horizontal/FuseNavHorizontalGroup';
import FuseNavHorizontalCollapse from './horizontal/FuseNavHorizontalCollapse';
import FuseNavHorizontalItem from './horizontal/FuseNavHorizontalItem';
import FuseNavHorizontalLink from './horizontal/FuseNavHorizontalLink';

const layoutComponentMap = {
  'vertical' : {
    'group' : FuseNavVerticalGroup,
    'collapse' : FuseNavVerticalCollapse,
    'item' : FuseNavVerticalItem,
    'link' : FuseNavVerticalLink,
    'divider' : Divider
  },
  'horizontal' : {
    'group' : FuseNavHorizontalGroup,
    'collapse' : FuseNavHorizontalCollapse,
    'item' : FuseNavHorizontalItem,
    'link' : FuseNavHorizontalLink,
    'divider' : Divider
  }
};

function FuseNavigation(props)
{
  const {navigation, layout, active, dense, className} = props;

  const renderNavComponent = (item) => {
    const {id, type='unknown'} = item;

    const Component = layoutComponentMap[layout][type];

    if (type === 'divider') {
      return Component && <Component className="my-16"/>;
    } else {
      return Component && <Component key={id} item={item} nestedLevel={0} active={active} dense={dense}/>;
    }
  };

  const listClass = layout === 'vertical' ?
    'navigation whitespace-no-wrap' :
    'navigation whitespace-no-wrap flex p-0';

  return (
    <List className={clsx(listClass, className)}>
      {
        navigation.map((item) => renderNavComponent(item))
      }
    </List>
  );
}

FuseNavigation.propTypes = {
  navigation: PropTypes.array.isRequired,
  layout : PropTypes.oneOf(['vertical', 'horizontal']),
  active : PropTypes.bool,
  dense : PropTypes.bool,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

FuseNavigation.defaultProps = {
  layout: 'vertical'
};

export default React.memo(FuseNavigation);
