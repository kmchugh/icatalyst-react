import * as Actions from '../actions/navigation.actions';

const navigation = function (state = Actions.getInitialNavigation(), action) {
  switch ( action.type )
  {
  case Actions.GET_NAVIGATION:
  {
    return [
      ...state
    ];
  }
  case Actions.SET_NAVIGATION:
  {
    return [
      ...action.navigation
    ];
  }
  case Actions.RESET_NAVIGATION:
  {
    return [
      ...Actions.getInitialNavigation()
    ];
  }
  default:
  {
    return state;
  }
  }
};

export default navigation;
