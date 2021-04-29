import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {FuseLoading} from '../fuse';
import Modal from '@material-ui/core/Modal';
import {useSelector} from 'react-redux';

import Iframe from 'react-iframe';

const useStyles = makeStyles(()=>{
  return {
    root : {
      width: '100%',
      height: '100%'
    },
    modalWrapper : {
      width: '100%',
      height: '100%'
    },
    iframe : {
    }
  };
});

const WebView = ({
  uri,
  title,
  id = 'modalWrapper'
})=>{
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);

  // Import the layout so we know if we need to pad based on the nav menu
  const layoutConfig = useSelector(({app})=>{
    return app.settings.current;
  });

  const padding = layoutConfig.layout.navbar.folded ?
    0 :
    layoutConfig.layout.navbar.width;

  return (
    <div
      id={id}
      className={clsx(classes.root)}
    >
      { (!uri || !loaded) && (
        <Modal
          style={{
            paddingLeft : padding
          }}
          container={()=>(document.getElementById(id))}
          open={!loaded}
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
          sandbox="allow-same-origin allow-scripts allow-forms"
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
  title : PropTypes.string
  ,id : PropTypes.string
};
export default WebView;
