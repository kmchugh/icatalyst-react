import React from 'react';
import PropTypes from 'prop-types';

const Error = ({children})=>{
  return (
    children
  );
};

Error.propTypes = {
  children : PropTypes.string.isRequired
};

export default React.memo(Error);
