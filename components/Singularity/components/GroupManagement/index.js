import React, {useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import DetailContent from '../../../MasterDetail/DetailContent';
import {MasterDetailContext} from '../../../MasterDetail';
import {SingularityContext} from '../../../Singularity';
import {definition as groupsOwners} from '../../store/reducers/groupsOwners.reducer';

const GRAPH_ADMIN_ROLE_CODE = 'SINGULARITY_GRAPH_ADMIN_ROLE';

// Avoid re-probing the same group when DetailContent re-renders (e.g. tab change).
const canManageByGroupID = {};

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
const GroupManagement = ({readonly, auth, ...props})=>{
  const dispatch = useDispatch();
  const masterDetailContext = useContext(MasterDetailContext);
  const {accessToken, user} = useContext(SingularityContext);
  const {entity, entityDefinition} = masterDetailContext;
  const groupID = entity && entityDefinition && entityDefinition.getIdentity(entity);
  const isGraphAdminGroup = entity?.code === GRAPH_ADMIN_ROLE_CODE;
  // null = still checking; true = owners list loaded; false = no access
  const [canManageGroup, setCanManageGroup] = useState(null);

  useEffect(()=>{
    if (isGraphAdminGroup || !groupID) {
      setCanManageGroup(false);
      return;
    }

    if (canManageByGroupID[groupID] !== undefined) {
      setCanManageGroup(canManageByGroupID[groupID]);
      return;
    }

    // Same request as the Owners tab: GET .../groups/:id/users?type=owners.
    // Show child tabs only if the current user appears in that owners list.
    // Response is cached in groupsOwners.actions so the Owners tab does not refetch.
    const retrieveAll = groupsOwners.operations && groupsOwners.operations.RETRIEVE_ENTITIES;
    if (!retrieveAll) {
      setCanManageGroup(false);
      return;
    }

    dispatch(retrieveAll((err, owners)=>{
      const canManage = !err && isUserListedAsOwner(owners, user);
      canManageByGroupID[groupID] = canManage;
      setCanManageGroup(canManage);
    }, {
      accessToken,
      params : groupsOwners.getRetrieveAllParams(entityDefinition, entity)
    }));
  }, [groupID, entityDefinition, accessToken, isGraphAdminGroup, user, dispatch, entity]);

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

  const isDetailReadonly = readonly ||
    isGraphAdminGroup ||
    canManageGroup !== true;
  const detailAuth = auth && {
    ...auth,
    update: canManageGroup === true,
  };

  return (
    <MasterDetailContext.Provider value={{
      ...masterDetailContext,
      entityDefinition: detailDefinition,
    }}>
      <DetailContent
        {...props}
        auth={detailAuth}
        readonly={isDetailReadonly}
      />
    </MasterDetailContext.Provider>
  );
};

GroupManagement.propTypes = {
  readonly: PropTypes.bool,
  auth: PropTypes.object,
};

export default GroupManagement;
