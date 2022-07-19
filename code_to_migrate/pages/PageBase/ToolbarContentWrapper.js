import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import PageToolbar from './PageToolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.mode-simple' : {
      '& $wrapper' : {
        paddingLeft : theme.spacing(2),
        paddingRight : theme.spacing(2),
      },
      '& $toolbar' : {
        paddingLeft : theme.spacing(2),
        paddingRight : theme.spacing(2),
      }
    },
    '&.mode-carded' : {
      '& $toolbar' : {
        boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.06)',
        borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`,
        '&.reverse' : {
          borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
        }
      },
    },
    '&.mode-carded.reverse' : {
      '& $toolbar' : {
        borderRadius: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
      },
    },
  },
  wrapper : {
    display: 'flex',
    flex: '0 0 auto'
  },
  toolbar : {
  }
}));

function ToolbarContentWrapper({
  position, contentConfig, toolbarConfig,
  className, children, mode, toolbar, reverse = false
}) {

  const classes = useStyles();

  return (contentConfig.position === position || toolbarConfig.position === position) ? (
    <div className={clsx(classes.root, `position-${position}`, `mode-${mode}`, reverse && 'reverse', className)}>
      {
        (!reverse && children && contentConfig.display && contentConfig.position === position) && (
          <div className={classes.wrapper}>
            {children}
          </div>
        )
      }

      {
        (toolbar && toolbarConfig.display && toolbarConfig.position === position) && (
          <PageToolbar className={clsx(classes.toolbar)}>
            {toolbar}
          </PageToolbar>
        )
      }

      {
        (reverse && children && contentConfig.display && contentConfig.position === position) && (
          <div className={classes.wrapper}>
            {children}
          </div>
        )
      }
    </div>
  ) : null;
}
ToolbarContentWrapper.propTypes = {
  toolbar : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  position : PropTypes.oneOf(['outside', 'inside']),
  contentConfig : PropTypes.object,
  toolbarConfig : PropTypes.object,
  mode : PropTypes.oneOf(['carded', 'simple', 'cardedInside', 'chromeless']),
  className : PropTypes.string,
  reverse : PropTypes.bool
};

export default React.memo(ToolbarContentWrapper);
