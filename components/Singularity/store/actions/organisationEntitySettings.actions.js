import {generateActions} from '@icatalyst/utilities/generateActions';
import {
  generateOperations,
  makeReducerRequest,
  parseToken,
  toJSONBody,
  createURI,
} from '@icatalyst/utilities/generateOperations';
import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('organisationEntitySettings');

// Flat field names that hold theme palette values in the UI model.
// These are stripped before sending to the API and the nested themes
// object is reconstructed from them.
export const FLAT_THEME_FIELDS = [
  'lightPrimary', 'lightSecondary', 'lightError',
  'lightWarning', 'lightInfo', 'lightSuccess',
  'lightBgPaper', 'lightBgDefault',
  'darkPrimary', 'darkSecondary', 'darkError',
  'darkWarning', 'darkInfo', 'darkSuccess',
  'darkBgPaper', 'darkBgDefault',
];

function getSettingsUri() {
  return URIService.getURI('singularity', 'organisationEntitySettings');
}

// API returns a single document; Redux list reducer expects an array.
function normalizeToArray(raw) {
  if (raw == null) {
    return raw;
  }
  return Array.isArray(raw) ? raw : [raw];
}

// Reconstruct the nested themes object from flat UI fields.
function buildThemesFromFlat(entity) {
  const existing = entity.themes || {};
  return {
    light: {
      mode: 'light',
      name: existing.light?.name || 'light',
      palette: {
        primary: entity.lightPrimary,
        secondary: entity.lightSecondary,
        error: entity.lightError,
        warning: entity.lightWarning,
        info: entity.lightInfo,
        success: entity.lightSuccess,
        background: {
          paper: entity.lightBgPaper,
          default: entity.lightBgDefault,
        },
      },
    },
    dark: {
      mode: 'dark',
      name: existing.dark?.name || 'dark',
      palette: {
        primary: entity.darkPrimary,
        secondary: entity.darkSecondary,
        error: entity.darkError,
        warning: entity.darkWarning,
        info: entity.darkInfo,
        success: entity.darkSuccess,
        background: {
          paper: entity.darkBgPaper,
          default: entity.darkBgDefault,
        },
      },
    },
  };
}

// Build the API-ready payload from the flat UI model.
// Strips flat theme fields + internal _orgId, reconstructs themes.
function buildApiPayload(entity) {
  const rest = {...entity};
  delete rest.id;
  delete rest.guid;
  delete rest._orgId;
  const themes = buildThemesFromFlat(rest);
  FLAT_THEME_FIELDS.forEach((f) => delete rest[f]);
  rest.themes = themes;
  return toJSONBody(rest, false);
}

export const operations = generateOperations({
  uri: getSettingsUri,

  // Override RETRIEVE_ENTITIES so the single-document response is always
  // normalised to an array and the parent organisationID is stamped onto
  // each entity (needed for UPDATE routing).
  RETRIEVE_ENTITIES: (callback, requestConfig = {params: {}}) => {
    const {params = {}} = requestConfig;
    const url = createURI(getSettingsUri(), {...params});
    return makeReducerRequest(
      {
        method: 'get',
        url,
        headers: {
          Authorization: parseToken(requestConfig),
          'Content-Type': 'application/json',
        },
        data: {},
        transform: (raw) => {
          const arr = normalizeToArray(raw);
          if (!arr) {
            return arr;
          }
          return arr.map((e) => ({...e, _orgId: params.organisationID}));
        },
      },
      actions['ENTITY_UPDATED_LIST'],
      actions['ENTITY_UPDATED_LIST_ERROR'],
      callback
    );
  },

  // POST to base URL (no guid suffix — API design for this resource).
  ADD_ENTITY: (entity, callback, requestConfig = {}) => {
    const {params = {}} = requestConfig;
    const url = createURI(getSettingsUri(), {...params});
    return makeReducerRequest(
      {
        method: 'post',
        url,
        headers: {
          Authorization: parseToken(requestConfig),
          'Content-Type': 'application/json',
        },
        data: buildApiPayload(entity),
      },
      actions['ENTITY_ADDED'],
      actions['ENTITY_ADDED_ERROR'],
      callback
    );
  },

  // PATCH to base URL (standard UPDATE_ENTITY would append /{guid}/).
  UPDATE_ENTITY: (entity, callback, requestConfig = {}) => {
    const {params = {}} = requestConfig;
    const url = createURI(getSettingsUri(), {...params});
    return makeReducerRequest(
      {
        method: 'patch',
        url,
        headers: {
          Authorization: parseToken(requestConfig),
          'Content-Type': 'application/json',
        },
        data: buildApiPayload(entity),
      },
      actions['ENTITY_UPDATED'],
      actions['ENTITY_UPDATED_ERROR'],
      callback
    );
  },
}, actions);
