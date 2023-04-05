import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import IconButton from '../../../../components/IconButton';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {isURL} from '../../../../utilities/validations';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
    },
    syncButton: {
      flexShrink: 0,
      flexGrow: 0,
    }
  };
});

const OIDCDiscoveryInput = (props)=>{
  const styles = useStyles();
  const {t} = useContext(LocalizationContext);
  const [isRetrieving, setIsRetrieving] = useState(false);

  const {
    className,
    style = {},
    onChange,
    value,
    field,
    readonly,
    errors,
  } = props;

  const {
    id,
    required,
    maxLength,
    autoFocus = false,
  } = field;

  const displayValue = value || '';
  const rootURL = value.split('/').slice(0, 3).join('/').toLowerCase();

  const isUrlValue = isURL(rootURL) && rootURL.startsWith('https:');

  const hasErrors = !isUrlValue || (errors && errors.length > 0);

  const handleClick = async () => {
    try {
      setIsRetrieving(true);
      const response = await fetch(value);
      const data = await response.json();
      onChange && onChange(null, {
        auth : data.authorization_endpoint || '',
        token: data.token_endpoint || '',
        jwks: data.jwks_uri || '',
        userInfo: data.userinfo_endpoint || '',
        signOff: data.end_session_endpoint || '',
        introspect: data.introspection_endpoint || '',
        revokeToken: data.revocation_endpoint || '',
        issuer: data.issuer || '',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsRetrieving(false);
    }
  };

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
      onClick={(e)=>{
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <TextField
        className={clsx(props.className)}
        id={id}
        name={id}
        error={hasErrors}
        required={required}
        autoFocus={autoFocus}
        InputProps={{
          readOnly: readonly
        }}
        autoComplete="off"
        fullWidth
        variant="outlined"
        onChange={onChange}
        inputProps={{
          maxLength : maxLength
        }}
        multiline={maxLength>256}
        rows={Math.min(maxLength/256, 20) || 1}
        value={field.format ? field.format(displayValue) : displayValue}
      />
      {
        isRetrieving && (
          <CircularProgress style={{
            marginLeft: '.5em'
          }} size={16}/>
        )
      }
      {
        !isRetrieving && <IconButton
          className={clsx(styles.syncButton)}
          color="primary"
          title={t('Extract URLs from provider')}
          icon="sync"
          disabled={hasErrors}
          onClick={handleClick}
        />
      }
    </div>
  );
};

OIDCDiscoveryInput.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object,
  labelId: PropTypes.string,
};

export default OIDCDiscoveryInput;
