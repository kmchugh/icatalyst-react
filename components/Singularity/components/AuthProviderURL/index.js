import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as MessageActions from '../../../../store/actions/message.actions';
import IconButton from '../../../../components/IconButton';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';

import { useDispatch } from 'react-redux';
const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  };
});

const AuthProviderURL = ({
  className,
  style = {},
  url
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <Typography noWrap={true} variant="body1">
        {url}
      </Typography>
      <CopyToClipboard onCopy={(text,result)=>{
        dispatch(MessageActions.showMessage({
          message: (
            <Typography>{result ? t('Copied to Clipboard') : t('Could not copy to Clipboard')}</Typography>
          ),
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          variant: result ? 'success' : 'error'
        }));
      }} text={url}>
        <IconButton
          boxShadow={3}
          color="primary"
          title={t('Copy to clipboard')}
          icon="fa clipboard"
        />
      </CopyToClipboard>
    </div>
  );
};

AuthProviderURL.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  url: PropTypes.string
};

export default AuthProviderURL;
