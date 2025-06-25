import React from 'react';
import * as PropTypes from 'prop-types';
import ScrollWrapper from './ScrollWrapper';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles((theme) => ({
  root: {
    flex: '1 1 auto',
    '-webkit-overflow-scrolling': 'touch',

    '&.mode-simple' : {
      paddingLeft : theme.spacingNum(2),
      paddingRight : theme.spacingNum(2),
    },
    '&.mode-carded' : {
      marginLeft : theme.spacingNum(2),
      marginRight : theme.spacingNum(2),
    },
  }
}));



function ContentWrapper({
  config,
  className,
  children
}) {

  const classes = useStyles(config);
  const {mode} = config;

  return (
    <ScrollWrapper
      className={cxMui(classes.root, `mode-${mode}`, className)}
      scrollType="content"
      config={config}>
      {children}
    </ScrollWrapper>
  );
}
ContentWrapper.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  config : PropTypes.object,
  className : PropTypes.string
};

export default React.memo(ContentWrapper);
