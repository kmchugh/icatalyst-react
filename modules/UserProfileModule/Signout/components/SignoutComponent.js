import React, {useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {SingularityContext} from '@icatalyst/components/Singularity';


const LogoutComponent = ()=>{

  /**
   * Stores or retrieves a value from localstorage.
   * If value is undefined then this will retrieve a value for the
   * key specified, otherwise this will set the value for the key,
   * @method localStore
   * @param  {[type]}   key   the key to set or get the value for
   * @param  {[type]}   value if defined then the value to set
   * @return {[type]}         the value set
   */
  function localStore(key, value) {
    if (value !== undefined) {
      // Set the local storage
      localStorage.setItem(key, JSON.stringify(value));
    }
    return JSON.parse(localStorage.getItem(key));
  }

  const singularityContext = useContext(SingularityContext);

  useEffect(()=>{
    localStore('auth:action', 'signout');
    singularityContext.logout();
  }, []);
  return (
    <div/>
  );
};

LogoutComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default LogoutComponent;
