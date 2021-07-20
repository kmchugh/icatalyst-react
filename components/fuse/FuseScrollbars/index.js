import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MobileDetect from 'mobile-detect';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import PropTypes from 'prop-types';
import React, { createRef, useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import withRouterAndRef from '../withRouterAndRef';

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const handlerNameByEvent = {
  'ps-scroll-y': 'onScrollY',
  'ps-scroll-x': 'onScrollX',
  'ps-scroll-up': 'onScrollUp',
  'ps-scroll-down': 'onScrollDown',
  'ps-scroll-left': 'onScrollLeft',
  'ps-scroll-right': 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end': 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end': 'onXReachEnd'
};
Object.freeze(handlerNameByEvent);

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .ps__thumb-y' : {
        backgroundColor: theme.palette.primary.compliment
      }
    }
  };
});

const FuseScrollbars = React.forwardRef(function FuseScrollbars(props, ref){
  ref = ref || createRef();
  const ps = useRef(null);
  const handlerByEvent = useRef(new Map());
  const classes = useStyles();
  const { customScrollbars, role } = props;

  const hookUpEvents = useCallback(() => {
    Object.keys(handlerNameByEvent).forEach(key => {
      const callback = props[handlerNameByEvent[key]];
      if (callback) {
        const handler = () => callback(ref.current);
        handlerByEvent.current.set(key, handler);
        ref.current.addEventListener(key, handler, false);
      }
    });
  }, [ref]);

  const unHookUpEvents = useCallback(() => {
    handlerByEvent.current.forEach((value, key) => {
      if (ref.current) {
        ref.current.removeEventListener(key, value, false);
      }
    });
    handlerByEvent.current.clear();
  }, [ref]);

  const destroyPs = useCallback(() => {
    unHookUpEvents();

    if (!ps.current) {
      return;
    }
    ps.current.destroy();
    ps.current = null;
  }, [unHookUpEvents]);

  const createPs = useCallback(() => {
    if (isMobile || !ref || ps.current) {
      return;
    }

    ps.current = new PerfectScrollbar(ref.current, props.options);

    hookUpEvents();
  }, [hookUpEvents, props.options, ref]);

  useEffect(() => {
    function updatePs() {
      if (!ps.current) {
        return;
      }
      ps.current.update();
    }

    updatePs();
  });

  useEffect(() => {
    if (customScrollbars) {
      createPs();
    } else {
      destroyPs();
    }
  }, [createPs, customScrollbars, destroyPs]);

  const scrollToTop = useCallback(() => {
    if (ref && ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [ref]);

  useEffect(() => {
    if (props.scrollToTopOnChildChange) {
      scrollToTop();
    }
  }, [scrollToTop, props.children, props.scrollToTopOnChildChange]);

  useEffect(
    () =>
      props.history.listen(() => {
        if (props.scrollToTopOnRouteChange) {
          scrollToTop();
        }
      }),
    [scrollToTop, props.history, props.scrollToTopOnRouteChange]
  );

  useEffect(
    () => () => {
      destroyPs();
    },
    [destroyPs]
  );

  return (
    <div
      id={props.id}
      className={clsx(classes.root, props.className)}
      role={role}
      style={
        props.customScrollbars && (props.enable || true) && !isMobile
          ? {
            position: 'relative',
            overflow: 'hidden',
            height:'100%'
          } : {
            overflow: 'auto'
          }
      }
      ref={ref}
    >
      {props.children}
    </div>
  );
});

function mapStateToProps({icatalyst}) {
  return {
    customScrollbars: icatalyst.settings.current.layout.customScrollbars
  };
}

FuseScrollbars.propTypes = {
  onScrollY: PropTypes.func,
  onScrollX: PropTypes.func,
  onScrollUp: PropTypes.func,
  onScrollDown: PropTypes.func,
  onScrollLeft: PropTypes.func,
  onScrollRight: PropTypes.func,
  onYReachStart: PropTypes.func,
  onYReachEnd: PropTypes.func,
  onXReachStart: PropTypes.func,
  onXReachEnd: PropTypes.func,
  scrollToTopOnRouteChange: PropTypes.bool,
  scrollToTopOnChildChange: PropTypes.bool,
  customScrollbars : PropTypes.bool,
  history : PropTypes.object,
  options : PropTypes.object,
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  id : PropTypes.string,
  enable : PropTypes.bool,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  role : PropTypes.string
};

FuseScrollbars.defaultProps = {
  className: '',
  enable: true,
  scrollToTopOnChildChange: false,
  scrollToTopOnRouteChange: false,
  options: {
    wheelPropagation: true,
    useBothWheelAxes: false,
    suppressScrollX : false,
    suppressScrollY : false,
  },
  ref: undefined,
  onScrollY: undefined,
  onScrollX: undefined,
  onScrollUp: undefined,
  onScrollDown: undefined,
  onScrollLeft: undefined,
  onScrollRight: undefined,
  onYReachStart: undefined,
  onYReachEnd: undefined,
  onXReachStart: undefined,
  onXReachEnd: undefined
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(withRouterAndRef(FuseScrollbars));
