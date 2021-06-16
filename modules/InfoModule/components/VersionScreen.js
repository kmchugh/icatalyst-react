import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FuseLoading from '@icatalyst/components/fuse/FuseLoading';
import {definition} from '@icatalyst/components/Singularity/store/reducers/version.reducer';
import VersionComponent from './VersionComponent';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import Image from '@icatalyst/components/Image';
import Logo from '@icatalyst/components/Logo';
import ModelService from '@icatalyst/services/ModelService';

const useStyles = makeStyles((theme)=>{
  return {
    root      : {
      width: '100%',
      height: 'auto',
      minHeight: '100%',
      display: 'flex',
      flexDirection : 'row',
      padding: theme.spacing(1),
      paddingTop: theme.spacing(1.5),
      backgroundColor: theme.palette.secondary.variants['600'],
      justifyContent: 'center',

      [theme.breakpoints.down('sm')] : {
        flexDirection : 'column',
        minHeight: 'auto'
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
          <VersionComponent
            title={client.name || ''}
            logo={
              <Logo showTitle={false}/>
            }
            versions={clientVersion.entities}
          />
        )
      }

      {
        singularityVersion.loaded && (
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
          />
        )
      }
    </div>
  );
};

export default VersionScreen;
