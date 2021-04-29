import React from 'react';
import {Dialog} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from 'app/store/actions';

function FuseDialog()
{
  const dispatch = useDispatch();
  const open = useSelector(({app}) => app.dialog.open);
  const options = useSelector(({app}) => app.dialog.options);

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(Actions.closeDialog())}
      aria-labelledby="fuse-dialog-title"
      {...options}
    />
  );
}

export default FuseDialog;
