import React from 'react';
import Dialog from './Dialog';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../store/actions/dialog.actions';

function StateDialog(){
  const dispatch = useDispatch();
  const {dialog} = useSelector(({icatalyst})=>icatalyst);

  const {
    open,
    options,
  } = dialog;

  const allowClose = options.allowClose === false ? false : true;

  return <Dialog
    open={!!open}
    onClose={()=>{
      allowClose && dispatch(Actions.closeDialog());
    }}
    {...options}
  />;
}

export default StateDialog;
