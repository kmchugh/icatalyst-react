import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FuseLoading} from '../fuse';
import Modal from '@mui/material/Modal';
import { createMuiStyles, cxMui } from '../../utilities';

const useStyles = createMuiStyles(()=>{
  return {
    root : {
      width: '100%',
      height: '100%',
      '& > div' : {
        position: 'absolute!important'
      }
    },
    modalWrapper : {
      width: '100%',
      height: '100%'
    },
    iframe : {
    },
  };
});

const WebView = ({
  uri,
  title,
  id = 'modalWrapper',
  ...rest
})=>{
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      id={id}
      className={cxMui(classes.root)}
    >
      { (!uri || !loaded) && (
        <Modal
          container={()=>(document.getElementById(id))}
          open={!loaded}
          disablePortal={true}
        >
          <div className={cxMui(classes.modalWrapper)}>
            <FuseLoading/>
          </div>
        </Modal>
      )}
      { (uri) && (
        <iframe
          className={cxMui(classes.iframe)}
          title={title}
          src={uri}
          width="100%"
          height="100%"
          sandbox="allow-same-origin allow-scripts allow-forms allow-downloads"
          onLoad={()=>{
            setLoaded(true);
          }}
          {...rest}
        />
      )
      }
    </div>
  );
};

WebView.propTypes = {
  uri : PropTypes.string,
  title : PropTypes.string,
  id : PropTypes.string
};
export default WebView;
