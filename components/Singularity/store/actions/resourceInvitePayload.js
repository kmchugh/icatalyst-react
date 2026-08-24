const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const RESERVED_RESOURCE_TYPES = {
  role: 'roles',
  group: 'groups',
};

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

const sanitizeName = (value) => {
  return (value || 'Resource invite').replace(/[^a-zA-Z0-9 _-]/g, '').trim() || 'Resource invite';
};

const resourceMapKey = (resourceType) => {
  return RESOURCE_MAP_OVERRIDES[resourceType] || `${resourceType}s`;
};

const buildRelationships = ({edgeTypes, start, expiry}) => {
  return asArray(edgeTypes).map((relationshipTypeID) => {
    const relationship = {relationshipTypeID};

    if (start != null) {
      relationship.starts = start;
    }

    if (expiry != null) {
      relationship.expires = expiry;
    }

    return relationship;
  });
};

const addEntitlement = (entitlements, {resourceType, resourceID, edgeTypes, start, expiry}) => {
  const relationships = buildRelationships({edgeTypes, start, expiry});
  const reservedResourceType = RESERVED_RESOURCE_TYPES[resourceType];

  if (reservedResourceType) {
    entitlements[reservedResourceType] = entitlements[reservedResourceType] || [];
    entitlements[reservedResourceType].push({
      id: resourceID,
      relationships,
    });
    return;
  }

  const mapKey = resourceMapKey(resourceType);
  entitlements.resourceMap = entitlements.resourceMap || {};
  entitlements.resourceMap[mapKey] = entitlements.resourceMap[mapKey] || [];
  entitlements.resourceMap[mapKey].push({
    id: resourceID,
    relationships,
  });
};

export const hasInviteRecipients = (entity = {}) => {
  return asArray(entity.emails || entity.email).length > 0;
};

export const buildResourceInvitePayload = (entity = {}, params = {}) => {
  const resourceType = entity.resourceType || entity.type || params.resourceType || params.type;
  const resourceID = entity.resourceID || entity.resourceid || params.resourceID || params.resourceid;
  const resourceDescription = entity.resourceDescription ||
    entity.resourcedescription ||
    params.resourceDescription ||
    params.description;
  const edgeTypes = entity.edgeTypes || entity.edgetypeid;
  const emails = asArray(entity.emails || entity.email);
  const name = sanitizeName(entity.name || resourceDescription || resourceType);
  const entitlements = {};

  addEntitlement(entitlements, {
    resourceType,
    resourceID,
    edgeTypes,
    start: entity.start ?? entity.starts,
    expiry: entity.expiry,
  });

  return {
    emails,
    expires: entity.expires || Date.now() + SEVEN_DAYS_MS,
    requiresAcknowledgement: entity.requiresAcknowledgement ?? true,
    entitlements,
    message: entity.message || `Invite for ${resourceDescription || name}`,
    name,
    ...(resourceDescription && {description: resourceDescription}),
  };
};
