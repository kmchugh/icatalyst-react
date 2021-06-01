import React from 'react';
import Dialog from './Dialog';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../store/actions/dialog.actions';

function StateDialog(){
  const dispatch = useDispatch();
  const {dialog} = useSelector(({icatalyst})=>icatalyst);

  const {
    open,
    options
  } = dialog;

  return <Dialog
    open={!!open}
    onClose={()=>{dispatch(Actions.closeDialog());}}
    {
      ...options
    }
  />;
}

export default StateDialog;
