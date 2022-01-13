import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {SingularityContext} from '@icatalyst/components/Singularity';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2)
    }
  };
});

const ChangePassword = ({
  className
})=>{
  const styles = useStyles();
  const singularityContext = useContext(SingularityContext);
  const location = useLocation();
  const state = location.state || {};
  const referrer = state.referrer;

  return (
    <div className={clsx(styles.root, className)}>
      <Button
        variant="contained"
        color="primary"
        onClick={()=>{
          singularityContext.changePassword(referrer ?
            `${window.location.origin}${referrer}` :
            referrer
          );
        }}>
        Change Password
      </Button>
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
