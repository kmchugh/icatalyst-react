import React, {useContext, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
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
const GroupManagement = ({readonly, auth, ...props})=>{
  const dispatch = useDispatch();
  const masterDetailContext = useContext(MasterDetailContext);
  const {accessToken, user} = useContext(SingularityContext);
  const {entity, entityDefinition} = masterDetailContext;
  const groupID = entity && entityDefinition && entityDefinition.getIdentity(entity);
  const userGuid = user && user.guid;
  const isGraphAdminGroup = entity?.code === GRAPH_ADMIN_ROLE_CODE;
  // null = still checking; true = owners list loaded; false = no access
  const [canManageGroup, setCanManageGroup] = useState(null);

  useEffect(()=>{
    setCanManageGroup(null);
  }, [groupID, userGuid]);

  useEffect(()=>{
    let isCurrent = true;

    if (isGraphAdminGroup || !entity) {
      setCanManageGroup(false);
      return ()=>{
        isCurrent = false;
      };
    }

    // GET .../groups/:id/users?type=owners — show child tabs only if the
    // current user appears in that owners list.
    const retrieveAll = groupsOwners.operations && groupsOwners.operations.RETRIEVE_ENTITIES;
    if (!retrieveAll) {
      setCanManageGroup(false);
      return ()=>{
        isCurrent = false;
      };
    }

    dispatch(retrieveAll((err, owners)=>{
      if (!isCurrent) {
        return;
      }
      setCanManageGroup(!err && isUserListedAsOwner(owners, user));
    }, {
      accessToken,
      params : groupsOwners.getRetrieveAllParams(entityDefinition, entity)
    }));

    return ()=>{
      isCurrent = false;
    };
  }, [entity, entityDefinition, accessToken, isGraphAdminGroup, user, userGuid, dispatch]);

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
