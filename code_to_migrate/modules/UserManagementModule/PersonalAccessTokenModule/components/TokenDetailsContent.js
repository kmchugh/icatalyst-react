import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as MActions from '../../../../store/actions/message.actions';
import {useDispatch} from 'react-redux';
import IconButton from '../../../../components/IconButton';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    codeWrapper : {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    authHeader : {
      marginTop: theme.spacing(1),
      wordBreak: 'break-all',
      background : 'beige',
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      borderRadius : theme.shape.borderRadius
    },
    bodyHeader : {
      marginTop: theme.spacing(1),
      background : 'beige',
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      overflowX: 'auto',
      borderRadius : theme.shape.borderRadius
    }
  };
});

const TokenDetailsContent = ({
  className,
  style = {},
  token = {}
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();

  const tokenRequest = {
    grant_type : 'password',
    username : token.guid,
    password : token.secret,
    scope: '<desired scope>'
  };

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <Typography
        variant="h4"
        component="h2"
      >
        A Token has been created.
      </Typography>

      <Typography
        variant="subtitle1"
      >
        You may use the token in the standard oauth password flow using the details below.
      </Typography>
      <Typography
        variant="subtitle1"
        color="error"
      >
        These details are not recoverable, please copy them before closing the dialog
      </Typography>
      <div className={clsx(styles.codeWrapper)}>
        <CopyToClipboard
          key="authHeader"
          onCopy={(text, result)=>{
            dispatch(MActions.showMessage({
              message: (
                <div>
                  <h3>{result ? 'Copied to Clipboard:' : 'Could not copy to Clipboard:'}</h3>
                  <h5>{text}</h5>
                </div>
              ),
              autoHideDuration: 1000,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              variant: result ? 'success' : 'error'
            }));
          }}
          text={`Basic ${token.token}`}
        >
          <div className="flex items-center">
            <Typography
              variant="subtitle1"
            >
              Authorization Header
            </Typography>
            <IconButton
              className="ml-8"
              size="small"
              icon="assignment"
              title="Copy to clipboard"/>
          </div>
        </CopyToClipboard>

        <div className={clsx(styles.authHeader)}>
          Basic {token.token}
        </div>

        <CopyToClipboard
          key="requestBody"
          onCopy={(text, result)=>{
            dispatch(MActions.showMessage({
              message: (
                <div>
                  <h3>{result ? 'Copied to Clipboard:' : 'Could not copy to Clipboard:'}</h3>
                  <h5>{text}</h5>
                </div>
              ),
              autoHideDuration: 1000,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              variant: result ? 'success' : 'error'
            }));
          }}
          text={JSON.stringify(tokenRequest, null, 2)}
        >
          <div className="flex items-center">
            <Typography
              variant="subtitle1"
            >
              Request Body
            </Typography>
            <IconButton
              className="ml-8"
              size="small"
              icon="assignment"
              title="Copy to clipboard"/>
          </div>
        </CopyToClipboard>

        <div className={clsx(styles.bodyHeader)}>
          <pre>
            {JSON.stringify(tokenRequest, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
};

TokenDetailsContent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  token : PropTypes.object.isRequired,
};

export default TokenDetailsContent;
