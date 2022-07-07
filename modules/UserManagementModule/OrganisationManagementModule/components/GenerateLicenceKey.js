import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Icon from '../../../../components/Icon';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';
import Button from '@material-ui/core/Button';
import {definition as licenceKeysDefinition} from '../../../../components/Singularity/store/reducers/licenceKeys.reducer';
import { useDispatch } from 'react-redux';
import {SingularityContext} from '../../../../components/Singularity';

const useStyles = makeStyles((theme)=>{
  return {
    root : {},
    icon : {
      marginRight : theme.spacing(1),
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

  const handleCreateLicence = ()=>{
    dispatch(
      licenceKeysDefinition.operations['ADD_ENTITY'](
        {},
        (err, res)=>{
          console.log({err, res});
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

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <Button
        variant="contained"
        color="primary"
        disabled={!licence.active}
        onClick={(e)=>{
          e.stopPropagation();
          handleCreateLicence();
        }}
      >
        <Icon className={clsx(styles.icon)}>key</Icon>
        {t('Generate Key')}
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
    guid : PropTypes.string.isRequired
  }).isRequired
};

export default GenerateLicenceKey;
