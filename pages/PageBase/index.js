import React, {useRef, useImperativeHandle, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import _ from 'lodash';
import {
  PageSidePanel,
  PageSidePanelHeader,
  PageSidePanelFooter
} from './PageSidePanel';
import ToolbarContentWrapper from './ToolbarContentWrapper';
import ScrollWrapper from './ScrollWrapper';
import ContentWrapper from './ContentWrapper';
import HeaderWrapper from './HeaderWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    flex: '1 1 auto',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
    '&.mode-chromeless'   : {
      margin: 0,
      padding: 0,
      '& $content' : {
        boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      '& $contentWrapper' : {
        margin: 0,
        padding: 0,
      },
      '& $centerColumn' : {
        margin: 0,
        padding: 0,
      },
      '& $rowBg' : {
        display: 'none'
      }
    },

    '&.mode-carded'   : {
      '& $content' : {
        boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      '& $contentWrapper' : {
      },
      '& $centerColumn' : {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      }
    },

    '&.mode-cardedInside'   : {
      '& $content' : {
        boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.06)',
        borderRadius: `${theme.spacing(1)}px`,
        marginBottom: theme.spacing(2),
      },
      '& $contentWrapper' : {
        flexDirection: 'column'
      },
      '& $centerColumn' : {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        overflow: 'hidden'
      },
    },

    '&.scroll-body'   : {
      height  : 'auto',
      '& $contentWrapper' : {
        flex    : '1 0 100%',
        overflow: 'auto'
      }
    },
    '&.scroll-sidepanels': {
      'height' : '100%',

      '& $contentWrapper': {
        flex    : '1 1 100%',
        overflow: 'auto'
      }
    },
    '&.scroll-content': {
      height : '100%',
      overflow : 'hidden',


      '& $contentWrapper': {
        flex    : '1 1 100%',
        overflow: 'hidden'
      },
      '& $content'       : {
        overflow: 'auto'
      }
    },
  },
  rowBg: {
    background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    backgroundSize: 'cover',
    flexShrink : 0,
    flexGrow: 0
  },
  headerWrapper: {
  },
  footerWrapper : {
  },
  centerColumn : {
    flexGrow: 1,
    flexShrink: 1
  },
  contentWrapper : {
    display: 'flex',
  },
  content : {
    backgroundColor: theme.palette.background.paper,
    color : theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1
  },
  cardedInsideSpacer : {
    width: '100%',
    position: 'absolute'
  },
  cardedHeaderSpacerFn : ({headerHeight})=>{
    return {
      height: headerHeight !== undefined ? (headerHeight +1) : theme.spacing(8)
    };
  },
  cardedHeaderSpacer : {
    marginTop: '-1px'
  },
  cardedFooterSpacerFn : ({footerHeight})=>{
    return {
      height: footerHeight !== undefined ? footerHeight : theme.spacing(8)
    };
  },
  cardedFooterSpacer : {
    bottom: 0
  },
  sidePanelHeader : {
  },
  leftSidePanelFn: ({leftSidePanel})=>{
    return {
      zIndex: 5,
      position: 'absolute',
      flexShrink: 0,
      width : `${leftSidePanel.width}px`,
      [theme.breakpoints.up('lg')]: {
        zIndex: 1,
        position: 'relative'
      }
    };
  },
  rightSidePanelFn: ({rightSidePanel})=>{
    return {
      zIndex: 5,
      position: 'absolute',
      flexShrink: 0,
      width : `${rightSidePanel.width}px`,
      [theme.breakpoints.up('lg')]: {
        zIndex: 1,
        position: 'relative'
      }
    };
  },
  sidePanelContent : {
  },
  sidePanelFooter : {
  },
}));


const Page = React.forwardRef((props, ref) => {

  const {
    children, config = {}, className,
    header, headerToolbar,
    footer, footerToolbar,
    leftSidePanel, rightSidePanel
  } = props;

  const settings = _.merge({
    customScrollbars : true,
    mode: 'carded', // 'carded', 'simple', 'cardedInside', 'chromeless'
    scroll : 'content', // 'body', 'content', 'sidepanels'
    leftSidePanel : {
      display : !!leftSidePanel,
      variant : 'permanent', // 'permanent', 'temporary'
      width : 240,
    },
    rightSidePanel : {
      variant : 'permanent', // 'permanent', 'temporary'
      display : !!rightSidePanel,
      width : 240,
    },
    headerToolbar : {
      display : !!headerToolbar,
      position: 'inside', // 'inside', 'outside',
    },
    header : {
      display : !!header,
      position: 'inside', // 'inside', 'outside'
    },
    footer : {
      display : !!footer,
      position: 'inside', // 'inside', 'outside'
    },
    footerToolbar : {
      display : !!footerToolbar,
      position: 'inside', // 'inside', 'outside',
    },
  }, config);

  const classes = useStyles(settings);

  const rootRef = useRef(null);

  const [leftSidePanelVisible, setLeftSidePanelVisible] = useState(false);
  const [rightSidePanelVisible, setRightSidePanelVisible] = useState(false);

  const displayLeftSidePanel = leftSidePanel && settings.leftSidePanel.variant === 'permanent' ||
    settings.leftSidePanel.display === true;
  const displayRightSidePanel = rightSidePanel && settings.rightSidePanel.variant === 'permanent' ||
      settings.rightSidePanel.display === true;

  useImperativeHandle(ref, () => ({
    rootRef,
    toggleLeftSidePanel: () => {
      if (settings.leftSidePanel.variant !== 'permanent') {
        setLeftSidePanelVisible((visible)=>!visible);
      }
    },
    toggleRightSidePanel: () => {
      if (settings.rightSidePanel.variant !== 'permanent') {
        setRightSidePanelVisible((visible)=>!visible);
      }
    }
  }));

  return (
    <div className={clsx(classes.root, `mode-${settings.mode}`, `scroll-${settings.scroll}`, className)} ref={rootRef}>

      <ToolbarContentWrapper
        position="outside"
        mode={settings.mode}
        contentConfig={settings.header}
        toolbarConfig={settings.headerToolbar}
        className={clsx(classes.rowBg, 'flex-0')}
        toolbar={headerToolbar}
      >
        <HeaderWrapper
          hasLeftSidePanel={displayLeftSidePanel}
          hasRightSidePanel={displayRightSidePanel}
          openLeftSidePanel={()=>{setLeftSidePanelVisible(true);}}
          openRightSidePanel={()=>{setRightSidePanelVisible(true);}}
        >
          {header}
        </HeaderWrapper>
      </ToolbarContentWrapper>
      <div className={clsx(classes.rowBg, 'flex')}>
        { (displayLeftSidePanel) &&
            <PageSidePanelHeader
              variant={settings.leftSidePanel.variant}
              className={clsx(classes.leftSidePanelFn, classes.sidePanelHeader, 'sidepanel-left')}>
              {leftSidePanel && leftSidePanel.header}
            </PageSidePanelHeader>
        }
        <ToolbarContentWrapper
          position="inside"
          mode={settings.mode}
          contentConfig={settings.header}
          toolbarConfig={settings.headerToolbar}
          className={clsx(classes.centerColumn)}
          toolbar={headerToolbar}
        >
          <HeaderWrapper
            hasLeftSidePanel={displayLeftSidePanel}
            hasRightSidePanel={displayRightSidePanel}
            openLeftSidePanel={()=>{setLeftSidePanelVisible(true);}}
            openRightSidePanel={()=>{setRightSidePanelVisible(true);}}
          >
            {header}
          </HeaderWrapper>
        </ToolbarContentWrapper>

        { (displayRightSidePanel) &&
          <PageSidePanelHeader
            variant={settings.rightSidePanel.variant}
            className={clsx(classes.rightSidePanelFn, classes.sidePanelHeader, 'sidepanel-right')}>
            {rightSidePanel && rightSidePanel.header}
          </PageSidePanelHeader>
        }
      </div>


      <ScrollWrapper className={clsx(classes.contentWrapper)} scrollType="sidepanels" config={settings}>
        { (displayLeftSidePanel) &&
          <PageSidePanel
            header={leftSidePanel.header}
            footer={leftSidePanel.footer}
            rootRef={rootRef}
            open={leftSidePanelVisible}
            position="left"
            variant={settings.leftSidePanel.variant}
            config={settings}
            className={clsx(classes.leftSidePanelFn, classes.sidePanelContent,
              'sidepanel-left')}
            openPanel={()=>{setLeftSidePanelVisible(true);}}
            closePanel={()=>{setLeftSidePanelVisible(false);}}
          >
            {leftSidePanel && leftSidePanel.content}
          </PageSidePanel>
        }

        {settings.mode === 'cardedInside' && <div className={clsx(classes.rowBg, classes.cardedInsideSpacer, classes.cardedHeaderSpacer, classes.cardedHeaderSpacerFn)}/>}
        {settings.mode === 'cardedInside' && <div className={clsx(classes.rowBg, classes.cardedInsideSpacer, classes.cardedFooterSpacer, classes.cardedFooterSpacerFn)}/>}

        <ContentWrapper
          config={settings}
          className={clsx(classes.content, classes.centerColumn)}
        >
          {children}
        </ContentWrapper>

        { (displayRightSidePanel) &&
          <PageSidePanel
            header={rightSidePanel.header}
            footer={rightSidePanel.footer}
            rootRef={rootRef}
            open={rightSidePanelVisible}
            position="right"
            variant={settings.rightSidePanel.variant}
            config={settings}
            className={clsx(classes.rightSidePanelFn, classes.sidePanelContent,
              'sidepanel-right')}
            openPanel={()=>{setRightSidePanelVisible(true);}}
            closePanel={()=>{setRightSidePanelVisible(false);}}
          >
            {rightSidePanel && rightSidePanel.content}
          </PageSidePanel>
        }
      </ScrollWrapper>

      <div className={clsx(classes.rowBg, 'flex')}>
        { (displayLeftSidePanel) &&
          <PageSidePanelFooter
            variant={settings.leftSidePanel.variant}
            className={clsx(classes.leftSidePanelFn, classes.sidePanelFooter, 'sidepanel-left')}>
            {leftSidePanel && leftSidePanel.footer}
          </PageSidePanelFooter>
        }

        <ToolbarContentWrapper
          position="inside"
          mode={settings.mode}
          contentConfig={settings.footer}
          toolbarConfig={settings.headerToolbar}
          className={clsx(classes.centerColumn, settings.mode === 'carded' ? 'mb-16' : 'mb-0')}
          toolbar={footerToolbar}
          reverse={true}
        >
          {footer}
        </ToolbarContentWrapper>

        { (displayRightSidePanel) &&
          <PageSidePanelFooter
            variant={settings.rightSidePanel.variant}
            className={clsx(classes.rightSidePanelFn, classes.sidePanelFooter, 'sidepanel-right')}>
            {rightSidePanel && rightSidePanel.footer}
          </PageSidePanelFooter>
        }

      </div>

      <ToolbarContentWrapper
        position="outside"
        mode={settings.mode}
        reverse={true}
        contentConfig={settings.footer}
        toolbarConfig={settings.footerToolbar}
        className={clsx(classes.rowBg, 'flex-0')}
        toolbar={footerToolbar}
      >
        {footer}
      </ToolbarContentWrapper>

    </div>
  );
});

Page.displayName = 'Page';
Page.propTypes = {
  className : PropTypes.string,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),

  header : PropTypes.node,
  footer : PropTypes.node,
  headerToolbar : PropTypes.node,
  footerToolbar : PropTypes.node,

  leftSidePanel : PropTypes.shape({
    header : PropTypes.node,
    content : PropTypes.node,
    footer : PropTypes.node
  }),
  rightSidePanel : PropTypes.shape({
    header : PropTypes.node,
    content : PropTypes.node,
    footer : PropTypes.node
  }),
  config : PropTypes.shape({
    customScrollbars : PropTypes.bool,
    mode : PropTypes.oneOf(['simple', 'carded', 'cardedInside', 'chromeless']),
    // Header height and footer height can be applied if mode is cardedInside
    headerHeight : PropTypes.number,
    footerHeight : PropTypes.number,

    scroll : PropTypes.oneOf(['body', 'sidepanels', 'content']),
    leftSidePanel : PropTypes.shape({
      display : PropTypes.bool,
      variant : PropTypes.oneOf(['permanent', 'temporary']),
      width : PropTypes.number
    }),
    rightSidePanel : PropTypes.shape({
      display : PropTypes.bool,
      variant : PropTypes.oneOf(['permanent', 'temporary']),
      width : PropTypes.number
    }),
    headerToolbar : PropTypes.shape({
      display : PropTypes.bool,
      position : PropTypes.oneOf(['inside', 'outside']),
    }),
    header : PropTypes.shape({
      display : PropTypes.bool,
      position : PropTypes.oneOf(['inside', 'outside']),
    }),
    footerToolbar : PropTypes.shape({
      display : PropTypes.bool,
      position : PropTypes.oneOf(['inside', 'outside']),
    }),
    footer : PropTypes.shape({
      display : PropTypes.bool,
      position : PropTypes.oneOf(['inside', 'outside']),
    })
  }),

};

export default Page;
