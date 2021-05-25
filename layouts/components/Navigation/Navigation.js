import React from 'react';
import FuseNavigation from '@icatalyst/components/fuse/FuseNavigation';
import clsx from 'clsx';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

function Navigation(props)
{
  const navigation = useSelector(({icatalyst}) => icatalyst.navigation);

  return (
    <FuseNavigation
      className={clsx('navigation', props.className)}
      navigation={navigation}
      layout={props.layout}
      dense={props.dense}/>
  );
}

Navigation.defaultProps = {
  layout: 'vertical'
};

Navigation.propTypes = {
  layout : PropTypes.string,
  className : PropTypes.string,
  dense : PropTypes.bool,
};

export default Navigation;
