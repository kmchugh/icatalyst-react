import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorWrapper from './ErrorWrapper';
import Icon from '../Icon';
import {Button} from '@material-ui/core';

/**
 * Ensures that errors are handled "gracefully".
 * ErrorBoundaries in react require extention from Component
 * @extends Component
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors : []
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      errors : [{
        message : error.message
      }]
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(errorInfo.componentStack);
  }


  render () {
    return (this.state.errors && this.state.errors.length > 0) ? (
      <ErrorWrapper
        title={'Oops something went wrong and we cannot recover from it.'}
        errors={this.state.errors}
        actionComponent={
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Icon>refresh</Icon>}
            onClick={()=>{
              location.reload();
            }}
          >
            Reload
          </Button>
        }
      />
    ) : this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default React.memo(ErrorBoundary);
