import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {definition} from '../../../components/Singularity/store/reducers/version.reducer';
import VersionComponent from './VersionComponent';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import Image from '../../../components/Image';
import Logo from '../../../components/Logo';
import ModelService from '../../../services/ModelService';
import TitledPage from '../../../pages/TitledPage';

const useStyles = makeStyles((theme)=>{
  return {
    root      : {
    },
    versionWrapper : {
      display : 'flex',
      flexDirection : 'row',

      [theme.breakpoints.down('sm')] : {
        flexDirection : 'column'
      },
    },
    logo : {
      width: theme.spacing(4),
      objectFit: 'cover',
    }
  };
});


const VersionScreen = ()=>{
  const classes = useStyles();
  const clientVersionModel = ModelService.getModel('client', 'version');

  const {client} = useSelector(({icatalyst})=>icatalyst.singularity.client);
  const [clientErrors, setClientErrors] = useState([]);
  const [singularityErrors, setSingularityErrors] = useState([]);

  const singularityVersion = useSelector(definition.getReducerRoot);
  const clientVersion = useSelector(clientVersionModel.getReducerRoot);

  const dispatch = useDispatch();

  useEffect(()=>{
    if (!singularityVersion.loaded) {
      // Retrieve the version
      dispatch(definition.operations['RETRIEVE_ENTITIES']((err)=>{
        setSingularityErrors(err);
      }));
    }

    if (clientVersionModel && !clientVersion.loaded) {
      dispatch(clientVersionModel.operations['RETRIEVE_ENTITIES']((err)=>{
        setClientErrors(err);
      }));
    }
  });

  return (
    <TitledPage
      title="Versions"
      className={clsx(classes.root)}>
      <div className={clsx(classes.versionWrapper)}>
        {
          (client && clientVersion) && (
            <VersionComponent
              title={client.name || ''}
              logo={
                <Logo showTitle={false}/>
              }
              versions={clientVersion.entities}
              errors={clientErrors}
            />
          )
        }

        <VersionComponent
          title="Singularity"
          logo={
            <Image
              className={clsx(classes.logo)}
              src="https://app.singularity.icatalyst.com/assets/images/logos/logo.svg"
              alt="Singularity Logo"
            />
          }
          versions={singularityVersion.entities}
          errors={singularityErrors}
        />
      </div>
    </TitledPage>
  );
};

export default VersionScreen;
