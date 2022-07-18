import * as Actions from '../actions/language.actions';
const initialState = {
  selected: null,
  vocabulary : {}
};

const message = function (state = initialState, action) {
  switch ( action.type )
  {
  case Actions.SET_LANGUAGE:
  {
    console.log('setting language to ', action);
    return {
      ...state,
      ...action.payload
    };
  }
  default:
  {
    return state;
  }
  }
};

export default message;
