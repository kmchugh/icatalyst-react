import React, {useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import DetailContent from '../../../MasterDetail/DetailContent';
import {MasterDetailContext} from '../../../MasterDetail';
import {SingularityContext} from '../../../Singularity';
import {definition as roleOwners} from '../../store/reducers/roleOwners.reducer';

const RoleDetails = ({readonly, auth, ...props})=>{
  const dispatch = useDispatch();
  const masterDetailContext = useContext(MasterDetailContext);
  const {accessToken, user} = useContext(SingularityContext);
  const {entity, entityDefinition} = masterDetailContext;
  const [ownership, setOwnership] = useState(null);

  // Tie permission to the checked role and session so navigation cannot reuse it.
  const canManageRole = ownership?.entity === entity &&
    ownership?.user === user &&
    ownership?.accessToken === accessToken &&
    ownership?.allowed === true;

  useEffect(()=>{
    let isCurrent = true;
    setOwnership(null);
    const retrieveAll = roleOwners.operations?.RETRIEVE_ENTITIES;

    if (entity && user?.displayName && retrieveAll) {
      dispatch(retrieveAll((err, owners)=>{
        if (isCurrent) {
          setOwnership({
            entity,
            user,
            accessToken,
            allowed: !err && Array.isArray(owners) &&
              owners.some(owner=>owner.username === user.displayName),
          });
        }
      }, {
        accessToken,
        params: roleOwners.getRetrieveAllParams(entityDefinition, entity),
      }));
    }

    return ()=>{
      isCurrent = false;
    };
  }, [entity, entityDefinition, user, accessToken, dispatch]);

  const detailDefinition = useMemo(()=>canManageRole ? entityDefinition : {
    ...entityDefinition,
    children: [],
  }, [entityDefinition, canManageRole]);

  return (
    <MasterDetailContext.Provider value={{
      ...masterDetailContext,
      entityDefinition: detailDefinition,
    }}>
      <DetailContent
        {...props}
        auth={auth && {...auth, update: canManageRole}}
        readonly={readonly || !canManageRole}
      />
    </MasterDetailContext.Provider>
  );
};

RoleDetails.propTypes = {
  readonly: PropTypes.bool,
  auth: PropTypes.object,
};

export default RoleDetails;
