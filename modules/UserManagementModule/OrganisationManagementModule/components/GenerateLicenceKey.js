import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Icon from '../../../../components/Icon';
import IconButton from '../../../../components/IconButton';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';
import Button from '@material-ui/core/Button';
import {definition as licenceKeysDefinition} from '../../../../components/Singularity/store/reducers/licenceKeys.reducer';
import { useDispatch } from 'react-redux';
import {SingularityContext} from '../../../../components/Singularity';
import * as DialogActions from '../../../../store/actions/dialog.actions';
import {DialogContent, DialogContentEntityView} from '../../../../components/Dialogs';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as MessageActions from '../../../../store/actions/message.actions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>{
  return {
    root : {},
    icon : {
      marginRight : theme.spacing(1),
    },
    dialogContent : {
    },
    licenceWrapper : {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(2)
    }
  };
});

const GenerateLicenceKey = ({
  className,
  style = {},
  licence
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  const {accessToken} = useContext(SingularityContext);
  const [updating, setUpdating] = useState(false);

  const displayResult  = (data)=>{
    dispatch(DialogActions.openDialog({
      title : t(licenceKeysDefinition.label),
      showTitle : false,
      children : (
        <DialogContent closeText={t('Close')}>
          <div className={clsx(styles.dialogContent)}>
            <Typography
              variant="h4"
              component="h1"
            >
              {licence.name}
            </Typography>
            <div className={clsx(styles.licenceWrapper)}>
              <Typography>{data.licenceID}</Typography>
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
              }} text={data.licenceID}>
                <IconButton
                  boxShadow={3}
                  color="primary"
                  title={t('Copy to clipboard')}
                  icon="fa clipboard"
                />
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
        {},
        (err, res)=>{
          setUpdating(false);
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
      className={clsx(styles.root, className)}
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
        <Icon className={clsx(styles.icon)}>{
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
  }).isRequired
};

export default GenerateLicenceKey;
