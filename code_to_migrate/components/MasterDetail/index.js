import React, {useContext, createContext, useState, useMemo, useEffect} from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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
import { useHistory } from 'react-router-dom';
import * as DialogActions from '../../store/actions/dialog.actions';
import {DialogContentEntityView} from '../Dialogs/Content';
import {DialogContentEntityList} from '../Dialogs/Content';

const pageConfigKey = 'masterdetail';
export const NEW_ID = 'new';

export const MasterDetailContext = createContext();

const MasterDetailPage = ({
  match,
  location,
  contained = false,
  definition = null
})=>{
  const DETAIL_PATH = `${match.path}/:id`;
  const {routes} = useContext(AppContext);
  const parentMasterDetailContext = useContext(MasterDetailContext);
  if (definition === null) {
    definition = matchRoutes(routes, match.path)[0].route.routeConfig;
  }

  const theme = useTheme();
  const history = useHistory();

  let detailMatch = useRouteMatch(DETAIL_PATH);
  const isDetail = !!detailMatch;

  const transitionLength = theme.transitions.duration.shortest;
  const dispatch = useDispatch();
  const singularityContext = useContext(SingularityContext);
  const [errors, setErrors] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(isDetail ? 72 : 64);
  const [detailID, setDetailID] = useState(null);
  const [selectedDetailEntity, setSelectedDetailEntity] = useState(null);
  const {isInRole, accessToken} = singularityContext;
  const [auth, setAuth] = useState(null);
  const [data, setData] = useState(null);
  const {
    title,
    operations,
    getReducerRoot = ()=>{
      console.warn(`You have not set a selector root for definition ${title}`);
    },
  } = definition;
  const [canAdd, setCanAdd] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  const reducer = useSelector(getReducerRoot);
  const {pages} = useSelector(({icatalyst}) => icatalyst.settings.current.layout);

  useEffect(()=>{
    setData((reducer && reducer.loaded ? reducer.entities : null));
  }, [reducer]);

  useEffect(()=>{
    if (!detailMatch) {
      if (headerHeight !== 64) {
        setHeaderHeight(64);
      }
      if (detailID) {
        setDetailID(null);
      }
      if (selectedDetailEntity) {
        setSelectedDetailEntity(null);
      }
    } else {
      if (headerHeight !== 72) {
        setHeaderHeight(72);
      }
      const updatedDetail = detailMatch && detailMatch.params && detailMatch.params.id;
      if (detailID !== updatedDetail) {
        setDetailID(updatedDetail);
      }
      if (updatedDetail && reducer.entity_map[updatedDetail]) {
        setSelectedDetailEntity(reducer.entity_map[updatedDetail]);
      }
    }
  }, [
    detailMatch && detailMatch.url, reducer
  ]);

  useEffect(()=>{
    Promise.resolve(
      definition.auth && definition.auth(
        singularityContext,
        parentMasterDetailContext
      )
    ).then((retrievedAuth)=>{
      if (retrievedAuth) {
        const resolvedAuth = Object.keys(retrievedAuth).reduce((acc, key)=>{
          acc[key] = typeof retrievedAuth[key] === 'boolean' ?
            retrievedAuth[key] :
            isInRole(retrievedAuth[key]);
          return acc;
        }, {});
        setAuth(resolvedAuth);
        setCanDelete(
          definition.canDelete === undefined ?
            resolvedAuth['delete'] :
            definition.canDelete
        );
        setCanAdd(
          definition.canAdd === undefined ?
            resolvedAuth['create'] :
            definition.canAdd
        );
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
        } else if (res) {
          // If there was a parent the responses were not added to the reducer as they are not global
          if (parentMasterDetailContext) {
            setData(res
              .filter(definition.filterPayload || (()=>true))
              .map(definition.transformPayload || ((i)=>i))
            );
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
        if (result && result.cancelToken) {
          result.cancelToken.cancel('Unloading');
        }
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
      // TODO: Find a way to do this without reloading if the parent hasn't changed
      // This ensures that a MasterView shows the parent details rather than reducer details
      if (parentMasterDetailContext) {
        return loadEntities();
      }
      setErrors(null);
    }
  }, [definition, reducer, auth]);

  const config = {
    mode :  contained ? 'chromeless' : (pages[pageConfigKey] && pages[pageConfigKey].mode) || pages.defaults.mode,
    headerHeight: headerHeight,
    footerHeight: 64
  };

  const header = useMemo(()=>{
    if (contained) {
      return null;
    }
    return (
      <Switch key={location.pathname} location={location}>
        <Route path={DETAIL_PATH} component={()=>{
          return config.mode !== 'chromeless' && <DetailHeader
            definition={definition}
            icon={definition.icon}
            backText={definition.labelPlural}
            auth={auth}
            backUrl={match.url}
          />;
        }}/>
        <Route component={()=>{
          return config.mode !== 'chromeless' && <MasterHeader
            title={definition.labelPlural}
            icon={definition.icon}
            auth={auth}
          />;
        }}/>
      </Switch>
    );
  }, [match && match.url,
    // Update if the child changes
    location.pathname.replace(match.path, '').split('/')[1]
  ]);

  const handleAdd = ()=>{
    if (definition.addInline === true) {
      // Definition specifies to add inline so pop up a dialog
      dispatch(DialogActions.openDialog({
        title : `Add ${definition.label}`,
        children : <DialogContentEntityView
          definition={definition}
          onSaved={(data, callback)=>{
            const addOperation = operations['ADD_ENTITY'];
            if (!addOperation) {
              callback([{
                message : 'Operation not accessible'
              }]);
            } else {
              dispatch(
                (dispatch, getState)=>{
                  return dispatch(addOperation(data,
                    (err, res)=>{
                      if (!err) {
                        definition.onAdded && definition.onAdded(res, dispatch, getState);
                      }
                      callback(err, res);
                    }, {
                      accessToken : accessToken,
                      params : definition.getAddParams ?
                        definition.getAddParams(getState, data, definition, {
                          ...match.params,
                          [definition.identityFieldName] : match.params.id
                        }, parentMasterDetailContext) :
                        parentMasterDetailContext
                    }
                  ));
                }
              );
            }
          }}
        />
      }));
    } else {
      // Browse to the create entity path
      let pathFn = (()=>`${window.location.pathname}/${NEW_ID}`);
      if (definition.createEntityPath) {
        pathFn = typeof definition.createEntityPath === 'function' ?
          definition.createEntityPath :
          ()=>definition.createEntityPath;
      }
      history.push(pathFn());
    }
  };

  const handleDelete = (entities)=>{
    dispatch(DialogActions.openDialog({
      title : `Delete ${entities.length === 1 ? definition.label : definition.labelPlural} `,
      children : <DialogContentEntityList
        entities={entities}
        message={`This will delete the following ${entities.length} ${definition.labelPlural}, this action is not recoverable.`}
        confirmation="Are you sure?"
        updatingTitle="Deleting..."
        definition={definition}
        onSaved={(data, callback)=>{
          const deleteOperation = operations['DELETE_ENTITIES'];
          if (!deleteOperation) {
            callback([{
              message : 'Operation not accessible'
            }]);
          } else {
            dispatch(
              (dispatch, getState)=>{
                return dispatch(deleteOperation(data,
                  (err, res)=>{
                    if (!err && definition.forceRefreshOnDelete) {
                      loadEntities();
                    }
                    if (!err) {
                      definition.onDeleted && definition.onDeleted(res, dispatch, getState);
                    }
                    callback(err, res);
                    DialogActions.closeDialog();
                  }, {
                    accessToken : accessToken,
                    params : definition.getDeleteParams ?
                      definition.getDeleteParams(getState, parentMasterDetailContext) :
                      {}
                  }
                ));
              }
            );
          }
        }}
      />
    }));
  };

  const content = useMemo(()=>{
    return (
      <Switch key={location.pathname} location={location}>
        <Route path={DETAIL_PATH} render={()=>{
          const WrapperComponent = definition.detailComponent ? definition.detailComponent : DetailContent;
          return (detailID === NEW_ID || (detailID && reducer.entity_map && reducer.entity_map[detailID])) ? (
            <WrapperComponent
              readonly={definition.readonly || false}
              definition={definition}
              contained={contained}
              auth={auth}
              config={config}
              backUrl={match.url}
              updateEntity={setSelectedDetailEntity}/>
          ) : <FuseLoading title={`Loading ${definition.label}...`}/>;
        }}/>
        <Route render={()=>{
          // Only show when both the data and the auth have been resolved
          return (auth && data) ? (
            <MasterContent
              // Fix for Safari table rendering
              className="relative"
              definition={definition}
              data={data}
              auth={auth}
              config={config}
              updating={updating}
              onRefresh={()=>{
                loadEntities();
              }}
              onAdd={canAdd ? handleAdd : null}
              onDelete={canDelete ? handleDelete : null}
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
    auth,
    canAdd,
    canDelete,
    handleAdd,
    handleDelete
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
              (!errors || errors.length === 0) && content
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
