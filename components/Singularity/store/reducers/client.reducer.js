import * as Actions from '../actions/client.actions';

const initialState = {
  client : null,
  singularity : null,
};

const client = function (state = initialState, action) {
  switch ( action.type )
  {
  case Actions.CLIENT_UPDATED:
  {
    return {
      ...state,
      client : {
        ...action.payload,
        id : action.payload.guid
      }
    };
  }
  case Actions.CLIENT_SINGULARITY_UPDATED:
  {
    return {
      ...state,
      client : {
        ...action.payload,
        id : action.payload.guid
      }
    };
  }
  default:
  {
    return state;
  }
  }
};

export default client;
