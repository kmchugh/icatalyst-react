import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const withRouterAndRef = WrappedComponent => {
  class InnerComponentWithRef extends React.Component {
    render() {
      const { forwardRef, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={forwardRef} />;
    }
  }

  InnerComponentWithRef.propTypes = {
    forwardRef : PropTypes.object
  };

  const ComponentWithRouter = withRouter(InnerComponentWithRef, { withRef: true });
  return React.forwardRef(
    function InnerComponentWithRef(props, ref) {
      return <ComponentWithRouter {...props} forwardRef={ref} />;
    });
};


export default withRouterAndRef;
