import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {SingularityContext} from '@icatalyst/components/Singularity';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ErrorWrapper from '@icatalyst/components/Errors/ErrorWrapper';
import FuseLoading from '@icatalyst/components/fuse/FuseLoading';
import TextField from '@material-ui/core/TextField';
import {isName} from '@icatalyst/components/EntityView/validations/isName';

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
    textWrapper : {
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(1),
    },
    title : {
      paddingLeft : theme.spacing(2),
      marginBottom: theme.spacing(.5),
      width: '100%'
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

  return updating ? (<FuseLoading title="Updating..."/>) : (
    <div className={clsx(styles.root, className)}>
      <Typography
        className={clsx(styles.title)}
        variant="h5"
        component="h2"
      >
        Display Name
      </Typography>
      <div className={clsx(styles.textWrapper)}>
        <TextField
          className={clsx(styles.textField)}
          fullWidth
          key="Name"
          placeholder="Display Name"
          variant="outlined"
          value={displayName || ''}
          onChange={handleSearchChange}
          helperText={validationError}
          error={Boolean(validationError)}
        />
      </div>
      <Button
        disabled={Boolean(!user || validationError || (displayName === user.displayname))}
        onClick={()=>{
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
        }}
        variant="contained"
        color="primary"
      >
        Update
      </Button>

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
