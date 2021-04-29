import * as Actions from '../actions/dialog.actions';

const initialState = {
  open  : false,
  options: {
    children: ''
  }
};

const dialogs = function (state = initialState, action) {
  switch ( action.type )
  {
  case Actions.OPEN_DIALOG:
  {
    const {payload} = action;
    return {
      ...state,
      open  : true,
      options: {
        ...state.options,
        ...payload.options
      }
    };
  }
  case Actions.CLOSE_DIALOG:
  {
    return {
      ...state,
      open: false,
      options : {
        children : ''
      }
    };
  }
  default:
  {
    return state;
  }
  }
};

export default dialogs;
