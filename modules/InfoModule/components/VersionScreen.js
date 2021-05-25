import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FuseLoading from '@icatalyst/components/fuse/FuseLoading';
import {definition} from '@icatalyst/components/Singularity/store/reducers/version.reducer';
import VersionComponents from './VersionComponents';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import Image from '@icatalyst/components/Image';
import ModelService from '@icatalyst/services/ModelService';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection : 'column',
      padding: theme.spacing(1)
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

  const singularityVersion = useSelector(definition.getReducerRoot);
  const clientVersion = useSelector(clientVersionModel.getReducerRoot);

  const dispatch = useDispatch();

  useEffect(()=>{
    if (!singularityVersion.loaded) {
      // Retrieve the version
      dispatch(definition.operations['RETRIEVE_ENTITIES']());
    }

    if (clientVersionModel && !clientVersion.loaded) {
      dispatch(clientVersionModel.operations['RETRIEVE_ENTITIES']());
    }
  });

  return (
    <div className={clsx(classes.root)}>
      {
        !client || !singularityVersion.loaded && <FuseLoading/>
      }

      {
        (client && clientVersion && clientVersion.loaded) && (
          <VersionComponents
            title={client.name || ''}
            logo={
              <Image
                className={clsx(classes.logo)}
                src={client.logouri}
                alt={`${client.name} Logo`}
              />
            }
            versions={clientVersion.entities}
          />
        )
      }

      {
        singularityVersion.loaded && (
          <VersionComponents
            title="Singularity"
            logo={
              <Image
                className={clsx(classes.logo)}
                src="https://app.singularity.icatalyst.com/assets/images/logos/logo.svg"
                alt="Singularity Logo"
              />
            }
            versions={singularityVersion.entities}
          />
        )
      }
    </div>
  );
};

export default VersionScreen;
