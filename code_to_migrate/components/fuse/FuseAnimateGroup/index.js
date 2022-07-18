import PropTypes from 'prop-types';
import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import 'velocity-animate/velocity.ui';

const enterAnimationDefaults = {
  animation: 'transition.fadeIn',
  stagger: 50,
  duration: 200,
  display: null,
  visibility: 'visible',
  delay: 0
};

const leaveAnimationDefaults = {
  stagger: 50,
  duration: 200,
  display: null,
  visibility: 'visible',
  delay: 0
};

function FuseAnimateGroup(props) {
  const {children, ...rest} = props;
  return (
    <VelocityTransitionGroup
      {...rest}
      enter={{ ...enterAnimationDefaults, ...props.enter }}
      leave={{ ...leaveAnimationDefaults, ...props.leave }}
    >
      {children}
    </VelocityTransitionGroup>
  );
}

FuseAnimateGroup.propTypes = {
  children: PropTypes.any,
  enter: PropTypes.object,
  leave: PropTypes.object
};

FuseAnimateGroup.defaultProps = {
  enter: enterAnimationDefaults,
  leave: leaveAnimationDefaults,
  easing: [0.4, 0.0, 0.2, 1],
  runOnMount: true,
  enterHideStyle: {
    opacity: 1
  },
  enterShowStyle: {
    opacity: 0
  }
};

export default React.memo(FuseAnimateGroup);
