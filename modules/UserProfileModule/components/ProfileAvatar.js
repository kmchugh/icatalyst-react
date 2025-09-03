import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../components/Avatar';
import {SingularityContext} from '@icatalyst/components/Singularity';
import DropZone from '../../../components/DropZone';
import Typography from '@mui/material/Typography';
import ErrorWrapper from '../../../components/Errors/ErrorWrapper';
import FuseLoading from '../../../components/fuse/FuseLoading';
import {uploadFile} from '../../../components/Singularity/store/actions/file.actions';
import { useDispatch } from 'react-redux';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      width: '100%',
      display : 'flex',
      flexDirection : 'column',
      alignItems : 'center',
      paddingBottom : theme.spacingNum(2),
      marginTop : theme.spacingNum(1),
      marginBottom : theme.spacingNum(2),
    },
    avatar : {
      width: theme.spacingNum(18),
      height: theme.spacingNum(18),
    },
    dropzoneWrapper : {
      marginBottom : theme.spacingNum(1),
    },
    dropzone : {
      width: theme.spacingNum(18),
      height: theme.spacingNum(18),
    },
    title : {
      paddingLeft : theme.spacingNum(2),
      marginBottom: theme.spacingNum(1),
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
    <div className={cxMui(styles.root, className)}>
      <Typography
        className={cxMui(styles.title)}
        component="h2"
        variant="h5"
      >
        Profile Image
      </Typography>
      <div className={cxMui(styles.dropzoneWrapper)}>
        <DropZone
          className={cxMui(styles.dropzone)}
          basePath={('profile/').toLowerCase()}
          value={[imageUrl]}
          onFilesDropped={onFileUpdated}
          multiple={false}
          title="Drag an image or click to upload"
        >
          <Avatar
            className={cxMui(styles.avatar)}
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
