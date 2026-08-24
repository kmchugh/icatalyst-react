import {generateActions} from '@icatalyst/utilities/generateActions';
import {
  createURI,
  generateOperations,
  makeReducerRequest,
  parseToken
} from '@icatalyst/utilities/generateOperations';
import {buildResourceInvitePayload} from './resourceInvitePayload';

import URIService from '@icatalyst/services/URIService';

export const actions = generateActions('resourceAccess');

const RESOURCE_MAP_OVERRIDES = {
  framework: 'framework',
  dashboard: 'dashboard',
};

const asArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
};

const resourceTypeFromMapKey = (mapKey) => {
  const override = Object.keys(RESOURCE_MAP_OVERRIDES).find((key) => {
    return RESOURCE_MAP_OVERRIDES[key] === mapKey;
  });

  return override || mapKey.replace(/s$/, '');
};

const getInviteList = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload && payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload && payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload && payload.entities)) {
    return payload.entities;
  }

  if (Array.isArray(payload && payload.results)) {
    return payload.results;
  }

  return payload ? [payload] : [];
};

const getInviteEmails = (invite) => {
  const recipients = invite.recipients || invite.invitees || invite.users;
  const recipientEmails = asArray(recipients).map((recipient) => {
    return typeof recipient === 'string' ? recipient : recipient.email || recipient.username;
  });

  return asArray(invite.emails || invite.email).concat(recipientEmails).filter(Boolean);
};

const matchesResource = (resourceType, resourceID, params = {}) => {
  const requestedType = params.resourceType || params.type;
  const requestedID = params.resourceID || params.resourceid;

  return (!requestedType || requestedType === resourceType) &&
    (!requestedID || requestedID === resourceID);
};

const isCollaboratorInvite = (invite, {includeUnknownAcknowledgement = false} = {}) => {
  const requiresAcknowledgement = invite.requiresAcknowledgement ?? invite.requires_acknowledgement;

  if (requiresAcknowledgement === false) {
    return true;
  }

  return includeUnknownAcknowledgement && requiresAcknowledgement == null;
};

const transformInvitesToResourceAccess = (payload, params = {}, options = {}) => {
  return getInviteList(payload).flatMap((invite) => {
    if (!isCollaboratorInvite(invite, options)) {
      return [];
    }

    const emails = getInviteEmails(invite);
    const entitlements = invite.entitlements || {};
    const resourceMap = entitlements.resourceMap || {};

    return Object.keys(resourceMap).flatMap((mapKey) => {
      const resourceType = resourceTypeFromMapKey(mapKey);

      return asArray(resourceMap[mapKey]).flatMap((resource) => {
        const resourceID = resource.id || resource.guid || resource.resourceID || resource.resourceid;

        if (!matchesResource(resourceType, resourceID, params)) {
          return [];
        }

        return asArray(resource.relationships).flatMap((relationship, relationshipIndex) => {
          return emails.map((email, emailIndex) => {
            const inviteID = invite.guid || invite.id;
            const relationshipTypeID = relationship.relationshipTypeID;

            return {
              guid: `${inviteID}-${resourceID}-${relationshipTypeID}-${emailIndex}-${relationshipIndex}`,
              id: `${inviteID}-${resourceID}-${relationshipTypeID}-${emailIndex}-${relationshipIndex}`,
              username: email,
              email,
              resourcetype: resourceType,
              resourcedescription: invite.description || invite.name,
              resourceid: resourceID,
              edgetypeid: relationshipTypeID,
              start: relationship.starts || invite.starts || invite.createdAt || invite.created,
              expiry: relationship.expires || invite.expires,
              invite,
            };
          });
        });
      });
    });
  });
};

export const operations = generateOperations({
  uri: ()=>{
    return URIService.getURI('singularity', 'invites');
  },
  RETRIEVE_ENTITIES : (callback, requestConfig = {params: {}})=>{
    const params = requestConfig.params || {};
    const url = createURI(
      URIService.getURI('singularity', 'invites'),
      {
        ...params,
        requiresAcknowledgement: false,
      }
    );

    return makeReducerRequest({
      method : 'get',
      url,
      headers : {
        Authorization : parseToken(requestConfig),
        'Content-Type': 'application/json',
      },
      data : {},
      transform : (payload)=>{
        return transformInvitesToResourceAccess(payload, params);
      },
    },
    actions['ENTITY_UPDATED_LIST'],
    actions['ENTITY_UPDATED_LIST_ERROR'],
    callback
    );
  },
  ADD_ENTITY : (entity, callback, requestConfig = {})=>{
    const {params = {}} = requestConfig;
    const queryParams = {...params};
    delete queryParams.type;
    delete queryParams.resourceType;
    delete queryParams.resourceid;
    delete queryParams.resourceID;
    delete queryParams.description;
    delete queryParams.resourceDescription;

    const url = createURI(
      `${URIService.getURI('singularity', 'invites')}/bulk`,
      queryParams
    );

    return makeReducerRequest({
      method : 'post',
      url,
      headers : {
        Authorization : parseToken(requestConfig),
        'Content-Type': 'application/json',
      },
      data : buildResourceInvitePayload({
        ...entity,
        requiresAcknowledgement: false,
      }, params),
      transform : requestConfig.transform || ((payload)=>{
        return transformInvitesToResourceAccess(payload, params, {
          includeUnknownAcknowledgement: true,
        });
      }),
    },
    actions['ENTITY_ADDED'],
    actions['ENTITY_ADDED_ERROR'],
    callback
    );
  }
}, actions);
