/**
 * True when the user owns the organisation's administrative role.
 * @param {object} user - Singularity user (`userID`)
 * @param {object[]} roleEntities - Organisation role rows (`role`, `users`)
 */
export function isOrganisationAdmin(user, roleEntities) {
  if (!user || !Array.isArray(roleEntities) || roleEntities.length === 0) {
    return false;
  }

  return roleEntities.some((entity) => {
    const {role, users = []} = entity;

    if (!role) {
      return false;
    }

    const roleName = (role.name || '').toLowerCase();
    const roleDescription = (role.description || '').toLowerCase();
    const isAdministrativeRole =
      roleDescription === 'administrative role' ||
      roleName.includes('administrators');

    if (!isAdministrativeRole) {
      return false;
    }

    return users.some((u) => {
      const sameUser = u.guid === user.userID;

      if (!sameUser || !Array.isArray(u.edges)) {
        return false;
      }

      return u.edges.some((edge) => {
        const isOwnerEdge =
          edge.edgeType && edge.edgeType.code === 'SINGULARITY_OWNER_EDGE';
        const edgeToThisRole = edge.destinationID === role.guid;
        return isOwnerEdge && edgeToThisRole;
      });
    });
  });
}
