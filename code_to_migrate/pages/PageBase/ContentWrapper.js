import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import ScrollWrapper from './ScrollWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: '1 1 auto',
    '-webkit-overflow-scrolling': 'touch',

    '&.mode-simple' : {
      paddingLeft : theme.spacing(2),
      paddingRight : theme.spacing(2),
    },
    '&.mode-carded' : {
      marginLeft : theme.spacing(2),
      marginRight : theme.spacing(2),
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
      className={clsx(classes.root, `mode-${mode}`, className)}
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
