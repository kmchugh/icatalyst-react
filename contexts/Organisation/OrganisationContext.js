import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SingularityContext} from '@icatalyst/components/Singularity';
import {definition as organisationDefinition} from '@icatalyst/components/Singularity/store/reducers/organisations.reducer';
import {definition as organisationEntitySettingsDefinition} from '@icatalyst/components/Singularity/store/reducers/organisationEntitySettings.reducer';

export const OrganisationContext = createContext(null);

/**
 * Tracks the active platform organisation (defaults to the first in the API list)
 * and loads organisation entity-settings into Redux for that id.
 */
export function OrganisationProvider({children}) {
  const {accessToken} = useContext(SingularityContext);
  const dispatch = useDispatch();
  const orgState = useSelector(organisationDefinition.getReducerRoot);
  const {getIdentity, operations} = organisationDefinition;

  const [selectedOrganisationId, setSelectedOrganisationId] = useState(null);

  useEffect(()=>{
    if (!accessToken) {
      setSelectedOrganisationId(null);
      return;
    }
    dispatch(operations['RETRIEVE_ENTITIES'](()=>{}, {
      accessToken,
      params : {},
    }));
  }, [accessToken, dispatch, operations]);

  useEffect(()=>{
    if (!orgState.loaded) {
      return;
    }
    if (!orgState.entities || orgState.entities.length === 0) {
      setSelectedOrganisationId(null);
      return;
    }
    const entities = orgState.entities;
    const firstId = getIdentity(entities[0]);
    const selectionStillValid =
      selectedOrganisationId &&
      entities.some((e)=>getIdentity(e) === selectedOrganisationId);
    if (!selectedOrganisationId || !selectionStillValid) {
      setSelectedOrganisationId(firstId);
    }
  }, [orgState.loaded, orgState.entities, selectedOrganisationId, getIdentity]);

  useEffect(()=>{
    if (!accessToken || !selectedOrganisationId) {
      return;
    }
    dispatch(organisationEntitySettingsDefinition.operations['RETRIEVE_ENTITIES'](()=>{}, {
      accessToken,
      params : {
        organisationID : selectedOrganisationId,
      },
    }));
  }, [accessToken, selectedOrganisationId, dispatch]);

  const setSelectedOrganisationIdStable = useCallback((id)=>{
    setSelectedOrganisationId(id);
  }, []);

  const value = useMemo(()=>({
    selectedOrganisationId,
    setSelectedOrganisationId : setSelectedOrganisationIdStable,
    organisationsLoaded : orgState.loaded,
    organisations : orgState.entities || [],
    getIdentity,
  }), [
    selectedOrganisationId,
    setSelectedOrganisationIdStable,
    orgState.loaded,
    orgState.entities,
    getIdentity,
  ]);

  return (
    <OrganisationContext.Provider value={value}>
      {children}
    </OrganisationContext.Provider>
  );
}

OrganisationProvider.propTypes = {
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export function useOrganisation() {
  const ctx = useContext(OrganisationContext);
  if (ctx == null) {
    throw new Error('useOrganisation must be used within OrganisationProvider');
  }
  return ctx;
}

export default OrganisationProvider;
