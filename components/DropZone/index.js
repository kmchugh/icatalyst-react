import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Icon} from '@material-ui/core';
// import _ from '@icatalyst/@lodash';
import _ from 'icatalyst/@lodash';
import PropTypes from 'prop-types';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import * as Actions from '../../store/actions/message.actions';
import { useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root : {
    position : 'relative'
  },
  dropzone : {
    borderRadius : theme.shape.borderRadius,
    transition: theme.transitions.create(['opacity'], {
      easing  : theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    opacity: 0,
    backgroundColor: alpha(theme.palette.secondary.main, .25),
    color: theme.palette.secondary.text,
    minWidth: '100%',
    minHeight: '100%',
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.rejected': {
      backgroundColor: theme.palette.error[50],
    },

    ['&:hover'] : {
      transition: theme.transitions.create(['opacity'], {
        easing  : theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
      }),
      opacity: 1
    }
  },
  success : {
    backgroundColor: theme.palette.success[50]
  },
  error : {
    backgroundColor: theme.palette.error[50],
  }
}));


function Dropzone(props){
  const styles = useStyles();
  const dispatch = useDispatch();

  const {
    children,
    showMessage = (options)=>{
      dispatch(Actions.showMessage(options));
    },
    onFilesDropped,
    className,
    title = ''
  } = props;

  const onDrop = (files) => {
    setNotify(false);
    showMessage({
      message: (
        <div>
          <h3>Uploading the following files:</h3>
          <ul>
            {
              files.map((file, i)=>{
                return (<li key={file.name + '_' + i}>{file.name}</li>);
              })
            }
          </ul>
        </div>
      ),
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      variant: 'success'
    });
    onFilesDropped && onFilesDropped(files);
  };

  const onDropRejected = (files)=>{
    showMessage({
      message: (
        <div>
          <h3>The following files could not be uploaded:</h3>
          <ul>
            {
              files.map((file, i)=>{
                return (<li key={file.name + '_' + i}>{file.name}</li>);
              })
            }
          </ul>
        </div>
      ),
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      variant: 'error'
    });
  };

  const importedProps = _.merge({
    accept: ['image/*'],
    multiple: false,
    onDrop,
    onDropRejected,
  },_.pick(props, [
    'accept',
    'multiple',
    'className'
  ]));

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone(importedProps);

  const showDropZone = ()=>{
    setNotify(true);
  };

  const hideDropZone = ()=>{
    setNotify(false);
  };

  const [notify, setNotify] = useState(false);

  return (
    <div
      onMouseOver={showDropZone}
      {...getRootProps()}
      className={clsx(styles.root, className)}
    >
      <input {...getInputProps()} />
      {
        children
      }
      {
        (notify || isDragActive) && (
          <Tooltip
            title={title}
          >
            <div
              style={props.hoverStyle}
              onMouseOut={hideDropZone}
              className={clsx(styles.dropzone)}
            >
              <Icon fontSize="large">cloud_upload</Icon>
            </div>
          </Tooltip>
        )
      }
    </div>
  );
}

Dropzone.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  showMessage : PropTypes.func,
  onFilesDropped : PropTypes.func,
  hoverStyle : PropTypes.object,
  title : PropTypes.string
};

export default React.memo(Dropzone);
