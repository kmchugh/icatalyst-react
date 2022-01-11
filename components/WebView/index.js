import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {FuseLoading} from '../fuse';
import Modal from '@material-ui/core/Modal';

import Iframe from 'react-iframe';

const useStyles = makeStyles(()=>{
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
  id = 'modalWrapper'
})=>{
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      id={id}
      className={clsx(classes.root)}
    >
      { (!uri || !loaded) && (
        <Modal
          container={()=>(document.getElementById(id))}
          open={!loaded}
          disablePortal={true}
        >
          <div className={clsx(classes.modalWrapper)}>
            <FuseLoading/>
          </div>
        </Modal>
      )}
      { (uri) && (
        <Iframe
          className={clsx(classes.iframe)}
          title={title}
          url={uri}
          width="100%"
          height="100%"
          sandbox="allow-same-origin allow-scripts allow-forms allow-downloads"
          onLoad={()=>{
            setLoaded(true);
          }}
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
