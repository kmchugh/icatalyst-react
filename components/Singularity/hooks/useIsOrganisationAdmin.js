import {useCallback, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SingularityContext} from '../index';
import {definition as organisationUsersDefinition} from '../store/reducers/organisationUsers.reducer';
import {isOrganisationAdmin} from '../utilities/isOrganisationAdmin';

export default function useIsOrganisationAdmin(parentDefinition, parentEntity) {
  const dispatch = useDispatch();
  const {accessToken, user} = useContext(SingularityContext);
  const roleData = useSelector(organisationUsersDefinition.getReducerRoot);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshRoles = useCallback(() => {
    if (!parentEntity?.guid || !parentDefinition) {
      return;
    }
    return dispatch(organisationUsersDefinition.operations['RETRIEVE_ENTITIES'](() => {}, {
      accessToken,
      params: organisationUsersDefinition.getRetrieveAllParams(
        parentDefinition,
        parentEntity,
      ),
    }));
  }, [accessToken, dispatch, parentDefinition, parentEntity]);

  useEffect(() => {
    refreshRoles();
  }, [refreshRoles]);

  useEffect(() => {
    const entities = roleData?.entities;
    setIsAdmin(isOrganisationAdmin(user, entities));
  }, [roleData, user]);

  return isAdmin;
}
