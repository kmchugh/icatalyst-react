export const CLIENT_UPDATED = '[CLIENT] UPDATED';
export const CLIENT_SINGULARITY_UPDATED = '[CLIENT] SINGULARITY UPDATED';

export function setClient(client) {
  return {
    type : CLIENT_UPDATED,
    payload : {
      ...client
    }
  };
}

export function setSingularityClient(client) {
  return {
    type : CLIENT_SINGULARITY_UPDATED,
    payload : {
      ...client
    }
  };
}
