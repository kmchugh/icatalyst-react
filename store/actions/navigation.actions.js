import {
  prependNavItem,
  updateNavItem,
  removeNavItem
} from '@icatalyst/components/fuse/FuseUtils';

export const GET_NAVIGATION = '[NAVIGATION] GET NAVIGATION';
export const SET_NAVIGATION = '[NAVIGATION] SET NAVIGATION';
export const RESET_NAVIGATION = '[NAVIGATION] RESET NAVIGATION';

let initialNavigation = [];

export function getInitialNavigation() {
  return initialNavigation;
}

export function setInitialNavigation(navigation){
  if (!navigation) {
    console.warn('Initial navigation is not set correctly');
  }
  initialNavigation = navigation && [...navigation];
}

export function getNavigation()
{
  return {
    type: GET_NAVIGATION
  };
}

export function setNavigation(navigation)
{
  return {
    type: SET_NAVIGATION,
    navigation
  };
}

export function resetNavigation()
{
  return {
    type: RESET_NAVIGATION
  };
}

function recursiveAppendNavigationItem(navigation, item, parentID) {
  // No parentid, so just append to the root
  if (!parentID) {
    return [
      ...navigation,
      item
    ];
  } else {
    // There is a parent id, so recurse through to the parent
    return navigation.map((childItem)=>{
      if (childItem.id === parentID) {
        // append to this item
        return {
          ...childItem,
          children : [
            ...(childItem.children || []),
            item
          ]
        };
      } else {
        // not a match so recurse if needed
        return {
          ...childItem,
          children : childItem.children ? recursiveAppendNavigationItem(childItem, item, parentID) : childItem.children
        };
      }
    });
  }
}

export function appendNavigationItem(item, parentID)
{
  return (dispatch, getState) => {
    const {navigation} = getState().icatalyst;
    return dispatch({
      type      : SET_NAVIGATION,
      navigation: recursiveAppendNavigationItem(navigation, item, parentID)
    });
  };
}

export function prependNavigationItem(item, parentId)
{
  return (dispatch, getState) => {
    const {navigation} = getState().icatalyst;
    return dispatch({
      type      : SET_NAVIGATION,
      navigation: prependNavItem(navigation, item, parentId)
    });
  };
}

export function updateNavigationItem(id, item)
{
  return (dispatch, getState) => {
    const {navigation} = getState().icatalyst;
    return dispatch({
      type      : SET_NAVIGATION,
      navigation: updateNavItem(navigation, id, item)
    });
  };
}

export function removeNavigationItem(id)
{
  return (dispatch, getState) => {
    const {navigation} = getState().icatalyst;
    return dispatch({
      type      : SET_NAVIGATION,
      navigation: removeNavItem(navigation, id)
    });
  };
}
