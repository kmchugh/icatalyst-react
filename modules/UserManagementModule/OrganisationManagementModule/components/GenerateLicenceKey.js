import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import IconButton from '../../../../components/IconButton';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';
import Button from '@mui/material/Button';
import {definition as defaultLicenceKeysDefinition} from '../../../../components/Singularity/store/reducers/licenceKeys.reducer';
import { useDispatch } from 'react-redux';
import {SingularityContext} from '../../../../components/Singularity';
import * as DialogActions from '../../../../store/actions/dialog.actions';
import {DialogContent, DialogContentEntityView} from '../../../../components/Dialogs';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as MessageActions from '../../../../store/actions/message.actions';
import Typography from '@mui/material/Typography';
import { createMuiStyles, cxMui } from '../../../../utilities';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {},
    icon : {
      marginRight : theme.spacingNum(1),
    },
    dialogContent : {
    },
    licenceWrapper : {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacingNum(2)
    }
  };
});

const GenerateLicenceKey = ({
  className,
  style = {},
  licence,
  licenceKeysDefinition = defaultLicenceKeysDefinition
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  const {accessToken} = useContext(SingularityContext);
  const [updating, setUpdating] = useState(false);

  const displayResult  = (data)=>{
    dispatch(DialogActions.openDialog({
      title : t('Key for {0}', licenceKeysDefinition.label),
      showTitle : false,
      children : (
        <DialogContent closeText={t('Close')}>
          <div className={cxMui(styles.dialogContent)}>
            <Typography
              variant="h4"
              component="h1"
            >
              {licence.name}
            </Typography>
            <div className={cxMui(styles.licenceWrapper)}>
              <Typography variant="body1">
                {data.guid}
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
              }} text={data.guid}>
                <IconButton
                  boxShadow={3}
                  color="primary"
                  title={t('Copy to clipboard')}
                  icon="fa clipboard"
                  size="large" />
              </CopyToClipboard>
            </div>
          </div>
        </DialogContent>
      )
    }));
  };

  const createKey = (data, callback)=>{
    dispatch(
      licenceKeysDefinition.operations['ADD_ENTITY'](
        data,
        (err, res)=>{
          callback && callback(err);
          if (!err) {
            displayResult(res);
          }
        },
        {
          accessToken,
          params : {
            licenceID : licence.guid
          }
        }
      )
    );
  };

  const showLicenceKeyUI = ()=>{
    dispatch(DialogActions.openDialog({
      onClose : ()=>{
        setUpdating(false);
      },
      title : t(licenceKeysDefinition.label),
      children : (
        <DialogContentEntityView
          definition={{
            ...licenceKeysDefinition,
            generateModel : ()=>({
              duration : licence.duration,
              licenceID : licence.guid
            })
          }}
          onSaved={(licenceKey, callback)=>{
            createKey(licenceKey, callback);
          }}
          onClose={()=>{
            setUpdating(false);
          }}
        />
      )
    }));
  };

  const handleCreateLicence = ()=>{
    setUpdating(true);
    showLicenceKeyUI();
  };

  return (
    <div
      className={cxMui(styles.root, className)}
      style={{...style}}
    >
      <Button
        variant="contained"
        color="primary"
        disabled={updating || !licence.active}
        onClick={(e)=>{
          e.stopPropagation();
          handleCreateLicence();
        }}
      >
        <Icon className={cxMui(styles.icon)}>{
          updating ? 'fa spinner' : 'key'
        }</Icon>
        {t(updating ? 'Creating Key' : 'Create Key')}
      </Button>
    </div>
  );
};

GenerateLicenceKey.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  licence : PropTypes.shape({
    name : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    active : PropTypes.bool.isRequired,
    guid : PropTypes.string.isRequired,
    duration : PropTypes.number.isRequired
  }).isRequired,
  licenceKeysDefinition : PropTypes.object,
};

export default GenerateLicenceKey;
