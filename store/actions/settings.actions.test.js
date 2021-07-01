import * as actions from './settings.actions';
import {OPEN_USER_SETTINGS, CLOSE_USER_SETTINGS, SET_SETTINGS,SET_DEFAULT_SETTINGS, SET_INITIAL_SETTINGS, RESET_DEFAULT_SETTINGS, SET_USER_SETTINGS} from './settings.actions';

describe('open user settings', () => {

  it('open user settings', () => {

    const expectedAction = {
      type : OPEN_USER_SETTINGS,
    };
    expect(actions.openUserSettings()).toEqual(expectedAction);
  });


  it('close user settings', () => {

    const expectedAction = {
      type : CLOSE_USER_SETTINGS,
    };
    expect(actions.closeUserSettings()).toEqual(expectedAction);
  });


  it('set settings', () => {

    const settings = 124;
    const expectedAction = {
      type : SET_SETTINGS,
      value : settings
    };

    expect(actions.setSettings(settings)).toEqual(expectedAction);
  });

  it('set default settings', () => {

    const settings = 'abc';
    const expectedAction = {
      type : SET_DEFAULT_SETTINGS,
      value : settings
    };
    expect(actions.setDefaultSettings(settings)).toEqual(expectedAction);


  });

  it('set initial settings', () => {

    const expectedAction = {
      type : SET_INITIAL_SETTINGS,
    };
    expect(actions.setInitialSettings()).toEqual(expectedAction);
  });


  it('reset default settings', () => {

    const reset = 123;
    const expectedAction = {
      type : RESET_DEFAULT_SETTINGS,
      value : reset
    };
    expect(actions.resetSettings(reset)).toEqual(expectedAction);

  });

  it('set User Settings', () => {

    const value = 'user settings';
    const expectedAction = {
      type : SET_USER_SETTINGS,
      payload : value
    };
    expect(actions.setUserSettings(value)).toEqual(expectedAction);
  });

});
