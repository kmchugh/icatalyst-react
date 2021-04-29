import React, {useContext} from 'react';
import {Typography, Tooltip} from '@material-ui/core';
import PropTypes from 'prop-types';
import {SingularityContext} from '@icatalyst/components/Singularity';

function UserRoles(props){
  const singularityContext = useContext(SingularityContext);
  const {user} = singularityContext;
  const {roles} = user || {roles:[]};

  return (
    <Tooltip title={
      (
        roles.length > 1 ? <ul>
          {
            roles.map((role)=>{
              return (<li className="capitalize" key={role.guid}>{role.name}</li>);
            })
          }
        </ul> : ''
      )}>
      <Typography className={props.className} color={props.color}>{
        roles.length > 0 && (
          roles.length === 1 ?
            (roles[0].name) :
            (roles[0].name + ' + ' + (roles.length-1))
        )
      }</Typography>
    </Tooltip>
  );
}

UserRoles.propTypes = {
  className : PropTypes.string,
  color : PropTypes.string
};

UserRoles.defaultProps = {
  className : 'text-13 mt-8 opacity-50 whitespace-no-wrap',
  color: 'inherit'
};

export default React.memo(UserRoles);
