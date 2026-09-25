import React, {useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import DetailContent from '../../../MasterDetail/DetailContent';
import {MasterDetailContext} from '../../../MasterDetail';
import {SingularityContext} from '../../../Singularity';
import {definition as groupsOwners} from '../../store/reducers/groupsOwners.reducer';

const GRAPH_ADMIN_ROLE_CODE = 'SINGULARITY_GRAPH_ADMIN_ROLE';

const isUserListedAsOwner = (owners, user)=>{
  const userDisplayName = user && user.displayName;
  if (!userDisplayName || !Array.isArray(owners)) {
    return false;
  }
  return owners.some((owner)=>{
    return owner.username === userDisplayName;
  });
};

// Wraps group detail view: hides Owners/Members tabs unless the API allows
// management, and locks down the built-in graph-admin group.
const GroupManagement = ({readonly, ...props})=>{
  const masterDetailContext = useContext(MasterDetailContext);
  const {accessToken, user} = useContext(SingularityContext);
  const {entity, entityDefinition} = masterDetailContext;
  const isGraphAdminGroup = entity?.code === GRAPH_ADMIN_ROLE_CODE;
  // null = still checking; true = owners list loaded; false = no access
  const [canManageGroup, setCanManageGroup] = useState(null);

  useEffect(()=>{
    if (isGraphAdminGroup || !entity) {
      setCanManageGroup(false);
      return;
    }

    // Same request as the Owners tab: GET .../groups/:id/users?type=owners.
    // Show child tabs only if the current user appears in that owners list.
    const retrieveAll = groupsOwners.operations && groupsOwners.operations.RETRIEVE_ENTITIES;
    if (!retrieveAll) {
      setCanManageGroup(false);
      return;
    }

    // RETRIEVE_ENTITIES returns a Redux thunk (dispatch) => void. We only need
    // the HTTP result here, so invoke it with a no-op dispatch (no store update).
    const thunk = retrieveAll((err, owners)=>{
      setCanManageGroup(!err && isUserListedAsOwner(owners, user));
    }, {
      accessToken,
      params : groupsOwners.getRetrieveAllParams(entityDefinition, entity)
    });
    thunk(()=>{});
  }, [entity, entityDefinition, accessToken, isGraphAdminGroup, user]);

  // DetailContent builds tabs from entityDefinition.children. Omit children to
  // show only "Group Details"; keep full definition when management is allowed.
  const detailDefinition = useMemo(()=>{
    if (isGraphAdminGroup) {
      return {...entityDefinition, children: []};
    }
    if (!canManageGroup) {
      return {...entityDefinition, children: []};
    }
    return entityDefinition;
  }, [entityDefinition, isGraphAdminGroup, canManageGroup]);

  return (
    <MasterDetailContext.Provider value={{
      ...masterDetailContext,
      entityDefinition: detailDefinition,
    }}>
      <DetailContent
        {...props}
        readonly={readonly || isGraphAdminGroup}
      />
    </MasterDetailContext.Provider>
  );
};

GroupManagement.propTypes = {
  readonly: PropTypes.bool,
};

export default GroupManagement;
