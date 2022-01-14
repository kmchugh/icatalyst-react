import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {SingularityContext} from '@icatalyst/components/Singularity';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FuseLoading from '../../../components/fuse/FuseLoading';
import ErrorWrapper from '../../../components/Errors/ErrorWrapper';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      flexDirection : 'column',
      justifyContent: 'center',
      margin: theme.spacing(2)
    },
    successMessage : {
      color : mostReadable(
        tinycolor(theme.palette.background.default),
        [
          theme.palette.success.light,
          theme.palette.success.dark,
          theme.palette.success.main,
        ]
      ).toHex8String(),
      textAlign: 'center',
      marginTop: theme.spacing(1)
    },
    buttonWrapper : {
      display: 'flex',
      justifyContent: 'center',
    }
  };
});

const ChangePassword = ({
  className
})=>{
  const styles = useStyles();
  const singularityContext = useContext(SingularityContext);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  return (
    <div className={clsx(styles.root, className)}>
      {
        processing && (<FuseLoading/>)
      }
      { !processing && (
        <div className={clsx(styles.buttonWrapper)}>
          <Button
            disabled={error || message}
            variant="contained"
            color="primary"
            onClick={()=>{
              setError(null);
              setMessage(null);
              setProcessing(true);
              singularityContext.changePassword((err)=>{
                if (err) {
                  setError(err);
                } else {
                  setMessage('An email has been sent to the registered account');
                }
                setProcessing(false);
              });
            }}>
            Change Password
          </Button>
        </div>
      )}

      {error && (<ErrorWrapper errors={[error]}/>)}
      {message && (
        <Typography className={clsx(styles.successMessage)} variant="body1">
          {message}
        </Typography>
      )}
    </div>
  );
};

ChangePassword.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default ChangePassword;
