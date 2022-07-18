import React, {useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
// import {SingularityContext} from '@icatalyst/components/Singularity';
import { SingularityContext } from '../../../../components';


const LogoutComponent = ()=>{

  const singularityContext = useContext(SingularityContext);

  useEffect(()=>{
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
