import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {SingularityContext} from '@icatalyst/components/Singularity';
import IconButton from '../../../components/IconButton';
import Typography from '@mui/material/Typography';
import ErrorWrapper from '@icatalyst/components/Errors/ErrorWrapper';
import FuseLoading from '@icatalyst/components/fuse/FuseLoading';
import TextField from '@mui/material/TextField';
import {isName} from '@icatalyst/components/EntityView/validations/isName';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';
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
    textWrapper : {
      width: '100%',
      paddingLeft: theme.spacingNum(2),
      paddingRight: theme.spacingNum(2),
      marginTop : theme.spacingNum(1),
      marginBottom : theme.spacingNum(1),
    },
    title : {
      paddingLeft : theme.spacingNum(2),
      marginBottom: theme.spacingNum(.5),
      width: '100%'
    },
    inputField : {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    iconButton : {
      color: `${mostReadable(
        tinycolor(theme.palette.background.default),
        [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.primary.light,
          theme.palette.secondary.light,
          theme.palette.primary.dark,
          theme.palette.secondary.dark,
        ], {}
      ).toHexString()}`,
    }
  };
});

const ProfileDisplayName = ({
  className
})=>{
  const styles = useStyles();

  const singularityContext = useContext(SingularityContext);
  const {user, updateProfile} = singularityContext;

  const [displayName, setDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(()=>{
    if (user) {
      setDisplayName(user.displayname);
    }
  }, [user]);

  const handleSearchChange = (e) => {
    setDisplayName(e.target.value);
  };

  const validationError = displayName ? isName(null, {
    label : 'Display Name'
  }, displayName) : null;

  const isDisabled = Boolean(!user || validationError || (displayName === user.displayname));

  const onSubmit = (displayName)=>{
    setUpdating(true);
    setError(null);
    updateProfile({
      displayname : displayName
    }, (err/*, response*/)=>{
      if (err) {
        setError(err.message);
      }
      setUpdating(false);
    });
  };

  return updating ? (<FuseLoading title="Updating..."/>) : (
    <div className={cxMui(styles.root, className)}>
      <Typography
        className={cxMui(styles.title)}
        variant="h5"
        component="h2"
      >
        Display Name
      </Typography>
      <div className={cxMui(styles.inputField)}>
        <div className={cxMui(styles.textWrapper)}>
          <TextField
            className={cxMui(styles.textField)}
            fullWidth
            key="Name"
            placeholder="Display Name"
            variant="outlined"
            value={displayName || ''}
            onChange={handleSearchChange}
            onKeyPress={(e)=>{
              if (!isDisabled && e.key === 'Enter') {
                e.preventDefault();
                onSubmit(displayName);
              }
            }}
            helperText={validationError}
            error={Boolean(validationError)}
          />
        </div>
        <IconButton
          className={cxMui(styles.iconButton)}
          title="Update"
          icon="save"
          disabled={isDisabled}
          onClick={()=>{
            onSubmit(displayName);
          }}
          variant="contained"
          color="primary"
          size="large" />
      </div>
      {
        error && (
          <ErrorWrapper
            title={'Oops something went wrong.'}
            errors={[error]}
          />
        )
      }

    </div>
  );
};

ProfileDisplayName.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default ProfileDisplayName;
