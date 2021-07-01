import * as actions from './navbar.actions.js';
import {OPEN_FOLDED_NAVBAR, CLOSE_FOLDED_NAVBAR, TOGGLE_FOLDED_NAVBAR,TOGGLE_MOBILE_NAVBAR, OPEN_MOBILE_NAVBAR,CLOSE_MOBILE_NAVBAR} from './navbar.actions.js';

describe('navbar toggle folded', () => {

  it('navbar toggle folded', () => {

    const expectedAction = {
      type : TOGGLE_FOLDED_NAVBAR,
    };
    expect(actions.navbarToggleFolded()).toEqual(expectedAction);
  });


  it('open folded navbar', () => {

    const expectedAction = {
      type : OPEN_FOLDED_NAVBAR,
    };
    expect(actions.navbarOpenFolded()).toEqual(expectedAction);
  });


  it('close folded navbar', () => {

    const expectedAction = {
      type : CLOSE_FOLDED_NAVBAR,
    };
    expect(actions.navbarCloseFolded()).toEqual(expectedAction);
  });


  it('toggle mobile navbar', () => {

    const expectedAction = {
      type : TOGGLE_MOBILE_NAVBAR,
    };
    expect(actions.navbarToggleMobile()).toEqual(expectedAction);
  });


  it('open mobile navbar', () => {

    const expectedAction = {
      type : OPEN_MOBILE_NAVBAR,
    };
    expect(actions.navbarOpenMobile()).toEqual(expectedAction);
  });


  it('close mobile navbar', () => {

    const expectedAction = {
      type : CLOSE_MOBILE_NAVBAR,
    };
    expect(actions.navbarCloseMobile()).toEqual(expectedAction);
  });
});
