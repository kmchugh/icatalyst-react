import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SingularityContext} from '@icatalyst/components/Singularity';
import {definition as organisationDefinition} from '@icatalyst/components/Singularity/store/reducers/organisations.reducer';
import {definition as OrgEntitySettingsDefinition} from '@icatalyst/components/Singularity/store/reducers/organisationEntitySettings.reducer';
import {saveToLocalStore} from '@icatalyst/utilities/localstorage';

export const OrganisationContext = createContext(null);

const ORG_ENTITY_SETTINGS_LS_KEY = 'sensemaker.organisationEntitySettings';
const SELECTED_ORG_ID_LS_KEY = 'sensemaker.selectedOrganisationId';

function saveOrgEntitySettings(orgId, doc) {
  if (!orgId || !doc) {
    return;
  }
  saveToLocalStore(`${ORG_ENTITY_SETTINGS_LS_KEY}.${orgId}`, doc);
}

function readParsedLs(key) {
  try {
    if (global.localStorage) {
      const raw = global.localStorage.getItem(key);
      if (raw == null || raw === '') {
        return null;
      }
      return JSON.parse(raw);
    }
  } catch (e) {
    /* ignore */
  }
  return null;
}

/**
 * Tracks the active platform organisation (defaults to the first in the API list),
 * loads organisation entity-settings into Redux, and keeps a copy of the last
 * entity-settings document in context (`entitySettings`, loading, error). The API may return
 * a single object; it is normalised for Redux and stored here as that object (first list row).
 */
export function OrganisationProvider({children}) {
  const {accessToken} = useContext(SingularityContext);
  const dispatch = useDispatch();
  const orgState = useSelector(organisationDefinition.getReducerRoot);
  const {getIdentity, operations} = organisationDefinition;

  const [selectedOrganisationId, setSelectedOrganisationId] = useState(null);
  const [entitySettings, setEntitySettings] = useState(null);
  const [entitySettingsLoading, setEntitySettingsLoading] = useState(false);
  const [entitySettingsError, setEntitySettingsError] = useState(null);
  const entitySettingsRequestGen = useRef(0);

  useEffect(()=>{
    if (!accessToken) {
      setSelectedOrganisationId(null);
      setEntitySettings(null);
      setEntitySettingsLoading(false);
      setEntitySettingsError(null);
      return;
    }
    // Prime from cache so theme/selection match last session until API returns.
    const storedOrgIdRaw = readParsedLs(SELECTED_ORG_ID_LS_KEY);
    const idFromLs = typeof storedOrgIdRaw === 'string' ? storedOrgIdRaw : null;
    if (idFromLs) {
      setSelectedOrganisationId((prev)=>(prev == null ? idFromLs : prev));
      const cachedDoc = readParsedLs(`${ORG_ENTITY_SETTINGS_LS_KEY}.${idFromLs}`);
      if (
        cachedDoc != null &&
        typeof cachedDoc === 'object' &&
        !Array.isArray(cachedDoc)
      ) {
        setEntitySettings((prev)=>(prev == null ? cachedDoc : prev));
      }
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
    if (selectedOrganisationId) {
      saveToLocalStore(SELECTED_ORG_ID_LS_KEY, selectedOrganisationId);
    }
  }, [selectedOrganisationId]);

  useEffect(()=>{
    if (!accessToken || !selectedOrganisationId) {
      setEntitySettings(null);
      setEntitySettingsLoading(false);
      setEntitySettingsError(null);
      return;
    }
    const primedDoc = readParsedLs(
      `${ORG_ENTITY_SETTINGS_LS_KEY}.${selectedOrganisationId}`
    );
    const usePrimed =
      primedDoc != null &&
      typeof primedDoc === 'object' &&
      !Array.isArray(primedDoc);
    setEntitySettings(usePrimed ? primedDoc : null);
    const gen = ++entitySettingsRequestGen.current;
    setEntitySettingsLoading(true);
    setEntitySettingsError(null);
    dispatch(OrgEntitySettingsDefinition.operations['RETRIEVE_ENTITIES']((err, data)=>{
      if (gen !== entitySettingsRequestGen.current) {
        return;
      }
      setEntitySettingsLoading(false);
      if (err) {
        setEntitySettingsError(err);
        setEntitySettings(null);
      } else {
        setEntitySettingsError(null);
        // generateOperations invokes callback(null, null) when the request is cancelled
        const doc = data != null && data.length > 0 ? data[0] : null;
        setEntitySettings(doc);
        if (doc) {
          saveOrgEntitySettings(selectedOrganisationId, doc);
        }
      }
    }, {
      accessToken,
      params : {
        organisationID : selectedOrganisationId,
      },
    }));
  }, [accessToken, selectedOrganisationId, dispatch]);

  const setSelectedOrganisationIdStable = useCallback((id)=>{
    setSelectedOrganisationId(id);
  }, []);

  const updateEntitySettings = useCallback((rawDoc) => {
    setEntitySettings(rawDoc);
    if (rawDoc && selectedOrganisationId) {
      saveOrgEntitySettings(selectedOrganisationId, rawDoc);
    }
  }, [selectedOrganisationId]);

  const value = useMemo(()=>({
    selectedOrganisationId,
    setSelectedOrganisationId : setSelectedOrganisationIdStable,
    organisationsLoaded : orgState.loaded,
    organisations : orgState.entities || [],
    getIdentity,
    entitySettings,
    entitySettingsLoading,
    entitySettingsError,
    updateEntitySettings,
  }), [
    selectedOrganisationId,
    setSelectedOrganisationIdStable,
    orgState.loaded,
    orgState.entities,
    getIdentity,
    entitySettings,
    entitySettingsLoading,
    entitySettingsError,
    updateEntitySettings,
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
