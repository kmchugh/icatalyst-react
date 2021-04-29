import React, { useState, useEffect } from 'react';
import {Typography, Modal, Button} from '@material-ui/core';

const ReloadModal = ()=>{
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(()=>{
    const listener = ()=>{
      setUpdateAvailable(true);
    };

    window.addEventListener('updateAvailable', listener);

    return ()=>{
      window.removeEventListener('updateAvailable', listener);
    };

  });

  const onRefreshClicked = ()=>{
    window.location.reload(true);
  };

  return updateAvailable ?
    (
      <Modal open={updateAvailable} onClose={this.onClick}>
        <div className="flex justify-center m-16">
          <div className="flex-=col mr-16">
            <Typography variant="h6">
              An update is available
            </Typography>
            <Typography variant="subtitle1">
              Please refresh for the latest version.
            </Typography>
          </div>
          <Button color="secondary" variant="contained" size="large" onClick={onRefreshClicked}>Refresh</Button>
        </div>
      </Modal>
    ) : null;
};

export default ReloadModal;
