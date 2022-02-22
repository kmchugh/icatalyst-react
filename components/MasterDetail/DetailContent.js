import React, {useState, useEffect, useContext} from 'react';
import {ModelPropTypes} from '../../utilities/createModel';
import EntityView from '../EntityView';
import PropTypes from 'prop-types';
import {Button, ThemeProvider} from '@material-ui/core';
import Icon from '../Icon';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/styles';
import {useForm} from '../../hooks/fuse';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MasterDetailPage from './index';
import {FuseAnimateGroup} from '../fuse';
import PageBase from '../../pages/PageBase';
import { useSelector, useDispatch } from 'react-redux';
import DetailContentTabs from './DetailContentTabs';
import {MasterDetailContext} from './index';
import {SingularityContext} from '../Singularity';
import ErrorWrapper from '../Errors/ErrorWrapper';
import FuseLoading from '../fuse/FuseLoading';
import {isSafari} from 'react-device-detect';


const useStyles = makeStyles((theme) => {
  return {
    root : {
      // Safari doesn't like the height set on this component
      height: isSafari ? undefined : '100%',
      width: '100%',
      display: 'flex',
      flexDirection : 'column',
      overflow: 'hidden'
    },
    toolbarWrapper : {
      height: theme.spacing(9),
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center'
    },
    backButton: {
      marginLeft : theme.spacing(1),
      marginRight : theme.spacing(1),
    },
    tabBar : {
      height: theme.spacing(9),
      width: '100%',
    },
    tab : {
      height : theme.spacing(9),
      textTransform : 'none'
    },
    contentWrapper: {
      display: 'flex',
      flex: 1,
      flexShrink: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    errorWrapper: {
      padding: 0,
      flexShrink: 1,
      flexGrow: 0,
    },
    errorWrapperComponent: {
      padding: 0,
    },
    entityWrapper: {
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')] : {
        padding : theme.spacing(2),
        paddingTop: theme.spacing(3),
      },
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 0%',
      overflow: 'auto'
    },
    actionWrapper : {
      display: 'flex',
      justifyContent : 'flex-end',
    },
    actionButton : {
      marginLeft : theme.spacing(2)
    },
    actionButtonIcon : {
      marginRight : theme.spacing(1)
    },
    entityView : {
      overflow: 'auto',
      marginBottom : theme.spacing(1)
    }
  };
});

const DetailContent = ({
  readonly,
  onChange,
  match,
  auth,
  config,
  backUrl,
  history,
})=>{
  const classes = useStyles();
  const dispatch = useDispatch();

  const masterDetailContext = useContext(MasterDetailContext);
  const singularityContext = useContext(SingularityContext);

  const {
    entityDefinition : definition,
    entity,
  } = masterDetailContext;

  const { operations } = definition;

  const [modified, setModified] = useState(false);
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);
  const [responseErrors, setResponseErrors] = useState(null);
  const { form, handleChange, resetForm, setForm } = useForm(entity || definition.generateModel());
  const theme = useTheme();
  const transitionLength = theme.transitions.duration.shortest;
  const {/*isInRole,*/ accessToken} = singularityContext;

  const themes = useSelector(({icatalyst}) => icatalyst.settings.current.themes);

  const reset = ()=>{
    setModified(false);
    resetForm();
    onChange && onChange(form);
  };

  const canBeSubmitted = modified &&
      Object.keys(errors).flatMap(k=>errors[k]).length === 0;

  useEffect(()=>{
    if (form) {
      setErrors(definition.validate(form));
    }
  }, [form]);

  useEffect(()=>{
    setForm(entity || definition.generateModel());
  }, [entity]);

  const [tabs, setTabs] = useState([]);

  useEffect(()=>{
    if (!definition || !entity) {
      return;
    }

    setTabs([{
      icon : definition.icon,
      label : `${definition.label} Details`,
      visible : auth && auth.retrieveAll,
    }]);

    if (definition.children) {
      Promise.allSettled(
        definition.children.map((child)=>{
          return Promise.resolve(
            child.auth(
              singularityContext,
              masterDetailContext
            )).then((childAuth)=>{
            return [child, childAuth];
          });
        })
      ).then((tabAuthResults)=>{
        const tabs = tabAuthResults.map(({value})=>{
          const [child, childAuth] = value;
          const isVisible = typeof childAuth.retrieveAll === 'boolean' ?
            childAuth.retrieveAll :
            singularityContext.isInRole(childAuth.retrieveAll);
          return {
            icon : child.icon,
            path : child.name,
            label : child.labelPlural,
            visible : isVisible,
            description: child.description,
            component : child.component || MasterDetailPage,
            definition : child
          };
        }).filter(t=>t.visible === true);
        setTabs(t=>[...t, ...tabs]);
      });
    }
  }, [definition, entity]);

  const [selectedTab, setSelectedTab] = useState({
    prev : 0,
    current : Math.max(0, tabs.findIndex(t=>location.pathname.startsWith(match.url + '/' + t.path)))
  });

  useEffect(()=>{
    setSelectedTab({
      prev : 0,
      current : Math.max(0, tabs.findIndex(t=>location.pathname.startsWith(match.url + '/' + t.path)))
    });
  }, [tabs]);

  return (
    <div className={clsx(classes.root)}>
      <ThemeProvider theme={themes.toolbarTheme}>
        <DetailContentTabs
          config={config}
          tabs={tabs}
          backUrl={backUrl}
          selectedTab={selectedTab}
          onTabChanged={(index)=>{
            setSelectedTab((selected)=>{
              return {
                prev : selected.current,
                current : index
              };
            });
            const path = tabs[index].path;
            if (!path) {
              history.push(match.url);
            } else {
              history.push(!match.url.endsWith('/') ? `${match.url}/${path}` : `${match.url}${path}`);
            }
          }}
        />
      </ThemeProvider>

      <div className={clsx(classes.errorWrapper)}>
        {
          responseErrors && <ErrorWrapper className={clsx(classes.errorWrapperComponent)} errors={responseErrors}/>
        }
      </div>

      <div className={clsx(classes.contentWrapper)}>
        {definition && tabs && (
          <Switch key={location.pathname} location={location}>
            {tabs.filter(t=>t.visible && t.path).map((t)=>{
              return (
                <Route key={t.path}
                  path={`${match.path}/${t.path}`}
                  render={(routeParams)=>{
                    const Component = t.component;
                    return (
                      <FuseAnimateGroup
                        className="w-full h-full flex flex-col"
                        runOnMount={true}
                        enter={{
                          delay: transitionLength, duration: transitionLength,
                          animation: selectedTab.prev >= selectedTab.current ?
                            'transition.slideRightBigIn' :
                            'transition.slideLeftBigIn'
                        }}
                        leave={{
                          duration: transitionLength,
                          animation: selectedTab.prev > selectedTab.current ?
                            'transition.slideLeftBigOut' :
                            'transition.slideRightBigOut'
                        }}
                      >
                        <MasterDetailContext.Provider value={{
                          parentContext : masterDetailContext,
                          entityID : null,
                          entity : null,
                          entityDefinition : t.definition,
                          updateEntity : null
                        }}>
                          <Component
                            contained={true}
                            definition={t.definition}
                            {...routeParams}
                          />
                        </MasterDetailContext.Provider>
                      </FuseAnimateGroup>
                    );
                  }}
                />
              );
            })}
            <Route render={()=>{
              return (
                <div className={clsx(classes.entityWrapper)}>
                  <FuseAnimateGroup
                    className="w-full h-full flex flex-col"
                    runOnMount={true}
                    enter={{
                      delay: transitionLength, duration: transitionLength,
                      animation: selectedTab.prev > selectedTab.current ?
                        'transition.slideRightBigIn' :
                        'transition.slideLeftBigIn'
                    }}
                    leave={{
                      duration: transitionLength,
                      animation: selectedTab.prev > selectedTab.current ?
                        'transition.slideLeftBigOut' :
                        'transition.slideRightBigOut'
                    }}
                  >
                    {updating && <FuseLoading title="Updating..."/>}
                    {!updating && <EntityView
                      className={clsx(classes.entityView)}
                      definition={definition}
                      model={form || entity}
                      readonly={readonly || !auth || !auth.update || (!auth.create /* && !isNew */)}
                      errors={errors}
                      onChange={(e, valueMap)=>{
                        handleChange(e, valueMap);
                        setModified(true);
                        onChange && onChange(form);
                      }}
                    />
                    }
                    <div className="flex flex-1"/>
                    { (!readonly && (auth && (auth.update || (auth.create /* && !isNew */)))) &&
                      <div className={clsx(classes.actionWrapper)}>
                        <Button
                          className={clsx(classes.actionButton, 'whitespace-no-wrap normal-case')}
                          variant="contained"
                          color="primary"
                          disabled={updating || !canBeSubmitted || readonly}
                          onClick={() => {
                            setUpdating(true);
                            const isAdding = entity === null;
                            const operation = isAdding ? operations['ADD_ENTITY'] : operations['UPDATE_ENTITY'];
                            if (!operation) {
                              setResponseErrors([{
                                message : 'Operation not accessible'
                              }]);
                              setUpdating(false);
                            } else {

                              dispatch(
                                (dispatch, getState)=>{
                                  const params = isAdding ? (
                                    definition.getAddParams ?
                                      definition.getAddParams(getState, form, definition, {
                                        ...match.params,
                                        [definition.identityFieldName] : match.params.id
                                      }, masterDetailContext) : {}
                                  ) : (
                                    definition.getUpdateParams ?
                                      definition.getUpdateParams(getState, masterDetailContext) :
                                      {}
                                  );

                                  return dispatch(operation(form,
                                    (err, res)=>{
                                      setModified(false);
                                      setUpdating(false);
                                      if (err) {
                                        setResponseErrors(err);
                                      } else {
                                        isAdding && definition.onAdded && definition.onAdded(res, dispatch, getState);
                                        !isAdding && definition.onUpdated && definition.onUpdated(res, dispatch, getState);
                                        history.push(backUrl);
                                      }
                                    }, {
                                      accessToken : accessToken,
                                      params : params
                                    }
                                  ));
                                }
                              );
                            }
                          }}
                        >
                          <Icon className={clsx(classes.actionButtonIcon)}>save</Icon>
                          Save
                        </Button>

                        <Button
                          className={clsx(classes.actionButton, 'whitespace-no-wrap normal-case')}
                          variant="contained"
                          color="secondary"
                          disabled={updating || !modified || readonly}
                          onClick={reset}
                        >
                          <Icon className={clsx(classes.actionButtonIcon)}>cancel</Icon>
                        Cancel
                        </Button>
                      </div>
                    }
                  </FuseAnimateGroup>
                </div>
              );
            }}/>
          </Switch>
        )}
      </div>
    </div>
  );
};

DetailContent.propTypes = {
  definition : ModelPropTypes.isRequired,
  entity : PropTypes.object,
  onChange : PropTypes.object,
  readonly : PropTypes.bool,
  match : PropTypes.object,
  location : PropTypes.object,
  history : PropTypes.object,
  backUrl :PropTypes.string,
  auth : PropTypes.shape({
    create : PropTypes.bool,
    retrieve : PropTypes.bool,
    update : PropTypes.bool,
    delete : PropTypes.bool,
    retrieveAll : PropTypes.bool,
    route : PropTypes.bool,
  }),
  config : PageBase.propTypes.config,
  updateEntity : PropTypes.func.isRequired
};


export default withRouter(DetailContent);
