import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Avatar from '../../../components/Avatar';
// import {SingularityContext} from '@icatalyst/components/Singularity';
import { SingularityContext } from '../../../components';
import DropZone from '../../../components/DropZone';
import Typography from '@material-ui/core/Typography';
import ErrorWrapper from '../../../components/Errors/ErrorWrapper';
import FuseLoading from '../../../components/fuse/FuseLoading';
import {uploadFile} from '../../../components/Singularity/store/actions/file.actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      width: '100%',
      display : 'flex',
      flexDirection : 'column',
      alignItems : 'center',
      paddingBottom : theme.spacing(2),
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(2),
    },
    avatar : {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
    dropzoneWrapper : {
      marginBottom : theme.spacing(1),
    },
    dropzone : {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
    title : {
      paddingLeft : theme.spacing(2),
      marginBottom: theme.spacing(1),
      width: '100%'
    }
  };
});

const ProfileAvatar = ({
  className
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();

  const singularityContext = useContext(SingularityContext);
  const {user, updateProfile, accessToken} = singularityContext;

  const [imageUrl, setImageUrl] = useState(null);
  const [errors, setErrors] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(()=>{
    if (user) {
      setImageUrl(user.profileimageuri);
    }
  }, [user]);

  const onFileUpdated = (imageFiles) => {
    const image = imageFiles[0];
    const fileReader = new FileReader();
    fileReader.onload = (e)=>{
      setImageUrl(e.target.result);
      setUpdating(true);
      setErrors(null);
      dispatch(uploadFile(accessToken, '/profiles/', image, (err, res)=>{
        if (err) {
          setErrors(err);
          setUpdating(false);
        } else {
          updateProfile({
            profileimageuri : res.path
          }, (err/*, response*/)=>{
            if (err) {
              setErrors([err.message]);
            }
            setUpdating(false);
          });
        }
      }));
    };
    fileReader.readAsDataURL(image);
  };

  return updating ? (<FuseLoading title="Updating..."/>) : (
    <div className={clsx(styles.root, className)}>
      <Typography
        className={clsx(styles.title)}
        component="h2"
        variant="h5"
      >
        Profile Image
      </Typography>
      <div className={clsx(styles.dropzoneWrapper)}>
        <DropZone
          className={clsx(styles.dropzone)}
          basePath={('profile/').toLowerCase()}
          value={[imageUrl]}
          onFilesDropped={onFileUpdated}
          multiple={false}
          title="Drag an image or click to upload"
        >
          <Avatar
            className={clsx(styles.avatar)}
            border={false}
            alt={(user && user.displayname) || 'user profile image'}
            src={imageUrl}
          />
        </DropZone>
      </div>
      {
        errors && (
          <ErrorWrapper
            title={'Oops something went wrong.'}
            errors={errors}
          />
        )
      }

    </div>
  );
};

ProfileAvatar.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default ProfileAvatar;
