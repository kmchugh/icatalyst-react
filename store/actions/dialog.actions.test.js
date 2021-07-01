import * as actions from './dialog.actions';
import {OPEN_DIALOG, CLOSE_DIALOG} from './dialog.actions';


describe('dialog actions', () => {

  it('opens dialog', () => {

    const options = 'open';
    const expectedAction = {
      type:OPEN_DIALOG,
      payload : {
        options : 'open'
      }
    };

    expect(actions.openDialog(options)).toEqual(expectedAction);
  });

  it('closes dialog', () => {

    const expectedAction = {
      type:CLOSE_DIALOG,
    };

    expect(actions.closeDialog()).toEqual(expectedAction);
  });

});
