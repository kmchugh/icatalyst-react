import React, {useContext, createContext, useState, useCallback, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {PageBase} from '../../pages';
import {matchRoutes} from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../contexts';
import {FuseAnimateGroup} from '../fuse';
import {ErrorWrapper} from '../Errors';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '../../hooks/fuse';
import {SingularityContext} from '../Singularity';
import {FuseLoading} from '../fuse';
import MasterHeader from './MasterHeader';
import DetailHeader from './DetailHeader';
import DetailContent from './DetailContent';
import MasterContent from './MasterContent';
import SearchFilterProvider from '../Tables/SearchFilterProvider';

const pageConfigKey = 'masterdetail';

export const MasterDetailContext = createContext();

const MasterDetailPage = ({
  match,
  location,
  contained = false,
  definition = null
})=>{
  const {routes} = useContext(AppContext);
  const parentMasterDetailContext = useContext(MasterDetailContext);
  if (definition === null) {
    definition = matchRoutes(routes, match.path)[0].route.routeConfig;
  }

  const theme = useTheme();
  const transitionLength = theme.transitions.duration.shortest;
  const dispatch = useDispatch();
  const singularityContext = useContext(SingularityContext);
  const [errors, setErrors] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  const [detailID, setDetailID] = useState(null);
  const [selectedDetailEntity, setSelectedDetailEntity] = useState(null);
  const {isInRole, accessToken} = singularityContext;
  const [auth, setAuth] = useState(null);
  const [data, setData] = useState(null);
  const { title, operations, getReducerRoot = ()=>{
    console.warn(`You have not set a selector root for definition ${title}`);
  } } = definition;

  const reducer = useSelector(getReducerRoot);
  const {pages} = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  useEffect(()=>{
    setData((reducer && reducer.loaded ? reducer.entities : null));
  }, [reducer]);

  useEffect(()=>{
    Promise.resolve(
      definition.auth && definition.auth(
        singularityContext,
        parentMasterDetailContext
      )
    ).then((retrievedAuth)=>{
      if (retrievedAuth) {
        setAuth(Object.keys(retrievedAuth).reduce((acc, key)=>{
          acc[key] = typeof retrievedAuth[key] === 'boolean' ?
            retrievedAuth[key] :
            isInRole(retrievedAuth[key]);
          return acc;
        }, {}));
      } else {
        setAuth(null);
      }
    });
  }, [definition]);

  const loadEntities = ()=>{
    if (reducer && definition && operations && operations['RETRIEVE_ENTITIES']) {
      if (!auth.retrieveAll) {
        setErrors(['You do not have access to this operation']);
        return;
      }
      setUpdating(true);
      const result = dispatch(operations['RETRIEVE_ENTITIES']((err, res)=>{
        // Success will be picked up by the reducer change
        if (err) {
          setErrors(err.errors || err);
        } else {
          // If there was a parent the responses were not added to the reducer as they are not global
          if (parentMasterDetailContext) {
            setData(definition.transformPayload ? res.map(definition.transformPayload) : res);
          }
        }
        setUpdating(false);
      }, {
        accessToken : accessToken,
        params : {
          ...(definition.getRetrieveAllParams ? definition.getRetrieveAllParams(definition, {
            ...match.params,
            [definition.identityFieldName] : match.params.id
          }) : {})
        }
      }));

      return (()=>{
        result.cancelToken.cancel();
      });
    }
  };

  useDeepCompareEffect(()=>{
    setErrors(null);
    if (!auth) {
      return;
    }
    if (reducer && !reducer.loaded) {
      return loadEntities();
    } else if (!reducer) {
      if (!reducer) {
        setErrors(['Invalid reducer configuration']);
      }
    } else {
      setErrors(null);
    }
  }, [definition, reducer, auth]);

  const header = useCallback(()=>{
    if (contained) {
      return null;
    }
    return (
      <Switch key={location.pathname} location={location}>
        <Route path={`${match.path}/:id`} component={()=>(
          <DetailHeader
            definition={definition}
            icon={definition.icon}
            backText={definition.labelPlural}
            auth={auth}
            backUrl={match.path}
          />
        )}/>
        <Route path={`${match.path}`} component={()=>(
          <MasterHeader
            title={definition.labelPlural}
            icon={definition.icon}
            auth={auth}
          />
        )}/>
      </Switch>
    );
  }, [match && match.url,
    // Update if the child changes
    location.pathname.replace(match.path, '').split('/')[1]
  ])();

  const config = {
    mode :  contained ? 'chromeless' : (pages[pageConfigKey] && pages[pageConfigKey].mode) || pages.defaults.mode,
    headerHeight: headerHeight,
    footerHeight: 64
  };

  const content = useCallback(()=>{
    return (
      <Switch key={location.pathname} location={location}>
        <Route path={`${match.path}/:id`} render={({match : detailMatch})=>{
          setHeaderHeight(72);
          const updatedDetail = detailMatch && detailMatch.params && detailMatch.params.id;
          if (detailID !== updatedDetail) {
            setDetailID(updatedDetail);
          }
          if (detailID && reducer.entity_map[updatedDetail] && !selectedDetailEntity) {
            setSelectedDetailEntity(reducer.entity_map[updatedDetail]);
          }

          return (reducer.entity_map && reducer.entity_map[detailMatch.params.id]) ? (
            <DetailContent
              readonly={false}
              definition={definition}
              contained={contained}
              auth={auth}
              config={config}
              backUrl={match.path}
              updateEntity={setSelectedDetailEntity}/>
          ) : <FuseLoading title={`Loading ${definition.label}...`}/>;
        }}/>
        <Route render={()=>{
          setHeaderHeight(64);
          setDetailID(null);
          setSelectedDetailEntity(null);
          // Only show when both the data and the auth have been resolved
          return (auth && data) ? (
            <MasterContent
              // Fix for Safari table rendering
              className="absolute"
              definition={definition}
              data={data}
              auth={auth}
              config={config}
              updating={updating}
              onRefresh={()=>{
                loadEntities();
              }}
            />
          ) : <FuseLoading title={`Loading ${definition.labelPlural}...`}/>;
        }}/>
      </Switch>
    );
  }, [
    match && match.url,
    // Update if the child changes
    location.pathname.replace(match.path, '').split('/')[1],
    detailID,
    reducer,
    updating,
    data,
    auth
  ]);

  return (
    <SearchFilterProvider>
      <MasterDetailContext.Provider value={{
        parentContext : parentMasterDetailContext,
        entityID : detailID,
        entity : selectedDetailEntity,
        entityDefinition : definition,
        updateEntity : setSelectedDetailEntity
      }}>
        <PageBase
          config={config}
          header={header}
        >

          <FuseAnimateGroup
            className="w-full h-full relative flex-1 flex"
            runOnMount={false}
            enter={{
              animation: 'transition.slideRightBigIn',
              delay: transitionLength, duration: transitionLength,
              style: {
              }
            }}
            leave={{
              animation: 'transition.slideLeftBigOut',
              duration: transitionLength,
              style: {
                position: 'absolute'
              }
            }}
          >
            {
              (errors && errors.length > 0) && <ErrorWrapper errors={errors} title={`The following errors occurred when trying to retrieve ${definition.labelPlural}`}/>
            }

            {
              // Only show the content if there are no errors
              (!errors || errors.length === 0) && content()
            }

          </FuseAnimateGroup>
        </PageBase>
      </MasterDetailContext.Provider>
    </SearchFilterProvider>
  );
};


MasterDetailPage.propTypes = {
  match : PropTypes.object,
  location : PropTypes.object,
  contained : PropTypes.bool,
  definition : PropTypes.object
};

export default withRouter(MasterDetailPage);
