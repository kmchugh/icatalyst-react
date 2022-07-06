import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import { Wizard } from '@icatalyst/components/Wizard';
// import { useDispatch } from 'react-redux';
// import { SingularityContext } from '@icatalyst/components/Singularity';
import {definition as organisationDefinition} from '../../../../components/Singularity/store/reducers/organisations.reducer';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {}
  };
});

const OrganisationWizard = ({
  className,
  style = {},
  open = false,
  onClosed
})=>{
  const styles = useStyles();
  // const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  // const {accessToken} = useContext(SingularityContext);

  const entity = {

  };

  return (
    <Wizard
      className={clsx(styles.root, className)}
      style={{...style}}
      open={open}
      finishButtonIcon="save"
      finishButtonText={t('Save')}
      entity={entity}
      definition={organisationDefinition}
      title={t('Create {0}', t(organisationDefinition.name))}
      onSave={(data, callback)=>{
        console.log(data, callback);
        callback && callback();
      }}
      onClosed={()=>{
        onClosed && onClosed();
      }}
      pageLayouts={[
        {
          title : t('Create {0}', t(organisationDefinition.name)),
          subtitle : t('Details'),
          hideCloseButton : true,
          minHeight: 350,
          layout : ['name', 'description']
        }, {
          title : 'What format would you like to send this in?',
          subtitle : 'Review',
          hideCloseButton : true,
          minHeight: 350,
          layout : ['tagline']
        }
      ]}
    />
  );
};

OrganisationWizard.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  open: PropTypes.bool,
  onClosed : PropTypes.func
};

export default OrganisationWizard;
