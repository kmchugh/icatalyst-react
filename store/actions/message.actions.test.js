import * as actions from './message.actions';
import {HIDE_MESSAGE, SHOW_MESSAGE} from './message.actions';


describe('message actions', () => {

  it('hide message', () => {

    const expectedAction = {
      type : HIDE_MESSAGE,
    };

    expect(actions.hideMessage()).toEqual(expectedAction);
  });


  it('show message', () => {

    const options = 'show';
    const expectedAction = {
      type : SHOW_MESSAGE,
      options : 'show'
    };

    expect(actions.showMessage(options)).toEqual(expectedAction);
  });

});
