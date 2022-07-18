import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import ScrollWrapper from './ScrollWrapper';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles((theme) => {
  return {
    widthFn: ({width})=>{
      return {
        width: theme.spacing(35),
        [theme.breakpoints.up('lg')]: {
          width: width,
        }
      };
    },
    root: {
      position: 'absolute',
      overflow: 'hidden',
      maxWidth: '100%',
      '&.permanent': {
        [theme.breakpoints.up('lg')]: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }
      },
      height: '100%'
    },
    contentWrapper: {
      position: 'relative',
    },
    leftSidePanel: {
    },
    rightSidePanel: {
      left: 'calc(100%)',
      transition: theme.transitions.create(['left'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.exitingScreen,
      })
    },
    headerRoot : {

    },
    footerRoot : {

    },
    paper : {
      background : theme.palette.primary.main
    },
    hidden : {
    }
  };
});

export const PageSidePanelHeader = ({
  className, children, variant
})=>{
  const classes = useStyles();
  return variant === 'permanent' && (
    <Hidden mdDown>
      <div className={clsx(classes.headerRoot, className)}>
        {children}
      </div>
    </Hidden>
  );
};
PageSidePanelHeader.propTypes={
  className : PropTypes.string,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  variant : PropTypes.oneOf(['permanent', 'temporary']),
};

export const PageSidePanelFooter = ({
  className, children, variant
})=>{
  const classes = useStyles();
  return variant === 'permanent' && (
    <Hidden mdDown>
      <div className={clsx(classes.footerRoot, className)}>
        {children}
      </div>
    </Hidden>
  );
};
PageSidePanelFooter.propTypes={
  className : PropTypes.string,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  variant : PropTypes.oneOf(['permanent', 'temporary']),
};

export const PageSidePanel = ({
  className,
  children,
  config,
  variant = 'permanent',
  position = 'left',
  open,
  openPanel,
  closePanel,
  header,
  footer,
  rootRef
})=>{
  const panelConfig = position === 'left' ? config.leftSidePanel : config.rightSidePanel;
  const classes = useStyles(panelConfig);

  return (
    <>
      <Hidden lgUp={variant === 'permanent'}>
        <SwipeableDrawer
          variant="temporary"
          disableSwipeToOpen
          anchor={position}
          open={open}
          onClose={() => {
            closePanel && closePanel();
          }}
          onOpen={() => {
            openPanel && openPanel();
          }}
          SlideProps = {{
            onEntering: (node)=>{
              if (position === 'right') {
                const doc = (node && node.ownerDocument) || document;
                const containerWindow = doc.defaultView || window;
                node.style.left = `${containerWindow.innerWidth-panelConfig.width}px`;

                node.style.transition = '';
                node.style.webkitTransition = '';
                node.style.transform = '';
              }
            },
            onExiting: (node)=>{
              if (position === 'right') {
                const doc = (node && node.ownerDocument) || document;
                const containerWindow = doc.defaultView || window;
                node.style.left = `${containerWindow.innerWidth}px`;

                node.style.transition = '';
                node.style.webkitTransition = '';
                node.style.transform = '';
              }
            },
          }}
          classes={{
            root: clsx(classes.root, variant, !open ? classes.hidden : null),
            paper: clsx(
              classes.contentWrapper,
              classes.widthFn,
              variant,
              position === 'left' ? classes.leftSidePanel : classes.rightSidePanel,
            )
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          BackdropProps={{
            classes: {
              root: classes.backdrop
            }
          }}
          style={{ position: 'absolute' }}
          container={rootRef.current}
        >
          {header && header}
          <ScrollWrapper scrollType="content" config={config} className={clsx('flex-shrink')}>
            {children}
          </ScrollWrapper>
          {footer && footer}
        </SwipeableDrawer>
      </Hidden>
      {variant === 'permanent' && (
        <Hidden mdDown>
          <ScrollWrapper scrollType="content" config={config} className={clsx(classes.root, className)}>
            {children}
          </ScrollWrapper>
        </Hidden>
      )}
    </>
  );
};

PageSidePanel.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  header : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  footer : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  config : PropTypes.object,
  variant : PropTypes.oneOf(['permanent', 'temporary']),
  position : PropTypes.oneOf(['left', 'right']),
  open : PropTypes.bool,
  openPanel : PropTypes.func,
  closePanel : PropTypes.func,
  rootRef : PropTypes.object
};
export default React.memo(PageSidePanel);
