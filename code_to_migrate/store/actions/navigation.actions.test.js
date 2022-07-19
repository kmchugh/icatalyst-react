import * as actions from './navigation.actions';
import {SET_NAVIGATION, GET_NAVIGATION, RESET_NAVIGATION } from './navigation.actions';

describe('navigation actions', () => {


  it('set navigation', () => {

    const settings = 243;
    const expectedAction = {
      type : SET_NAVIGATION,
      navigation : settings
    };
    expect(actions.setNavigation(settings)).toEqual(expectedAction);
  });

  it('get navigation', () => {

    const expectedAction = {
      type : GET_NAVIGATION,
    };
    expect(actions.getNavigation()).toEqual(expectedAction);
  });

  it('reset navigation', () => {

    const expectedAction = {
      type : RESET_NAVIGATION,
    };
    expect(actions.resetNavigation()).toEqual(expectedAction);
  });




});
