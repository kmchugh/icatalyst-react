import React from 'react';
import * as PropTypes from 'prop-types';
import { FuseScrollbars } from '../../components/fuse';


function ScrollWrapper({children, scrollType, config, className}) {
  return scrollType === config.scroll ? (
    <FuseScrollbars className={className} scrollToTopOnRouteChange>
      {children}
    </FuseScrollbars> ) : (
    <div className={className}>
      {children}
    </div>);
}
ScrollWrapper.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  scrollType : PropTypes.oneOf(['body', 'content', 'sidepanels']),
  config : PropTypes.object,
  className : PropTypes.string
};

export default React.memo(ScrollWrapper);
