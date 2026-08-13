import React, {useContext, useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import {SingularityContext} from '../../../Singularity';
import MasterDetailPage, {MasterDetailContext} from '../../../MasterDetail';
import {isSafari} from 'react-device-detect';
import { Button, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material';
import DetailContentTabs from '../../../MasterDetail/DetailContentTabs';
import PageBase from '../../../../pages/PageBase';
// import RoleComponent from '../OrganisationUserManagement/RoleComponent';
// import UserEmailInputDialogContent from '../UserEmailInputDialogContent';
// import FuseLoading from '../../../fuse/FuseLoading';
import ErrorWrapper from '../../../Errors/ErrorWrapper';
import EntityView from '../../../EntityView';
import Icon from '../../../Icon';
import {useForm} from '../../../../hooks/fuse';
import { Route, Switch, withRouter } from 'react-router-dom';
// import * as DialogActions from '../../../../store/actions/dialog.actions';
import { createMuiStyles, cxMui } from '../../../../utilities';
import { useOrgPaletteMergedTheme } from '../../../../contexts/Organisation/useOrgPaletteMergedTheme';

const useStyles = createMuiStyles((theme)=>{
  return {
    root : {
      // Safari doesn't like the height set on this component
      height: isSafari ? undefined : '100%',
      width: '100%',
      display: 'flex',
      flexDirection : 'column',
      alignItems: 'center',
      overflow: 'auto'
    },
    tabWrapper: {
      width: '100%'
    },
    contentWrapper: {
      width: '100%',
      flexGrow: 1,
      padding: theme.spacingNum(2),
    },
    errorWrapper: {
      padding: 0,
      flexShrink: 0,
      flexGrow: 0,
      width: '100%',
    },
    errorWrapperComponent: {
      padding: 0,
    },
    entityViewWrapper: {
      flexGrow: 0,
      flexShrink: 0,
    },
    actionWrapper : {
      display: 'flex',
      justifyContent : 'flex-end',
    },
    actionButton : {
      marginLeft : theme.spacingNum(2),
    },
    actionButtonIcon : {
      marginRight : theme.spacingNum(1),
    }
  };
});

const RoleManagement = ({
  className,
  style = {},
  auth,
  backUrl,
  config,
  readonly,
  match,
  history,
  location,
})=>{
  const styles = useStyles();

  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  const masterDetailContext = useContext(MasterDetailContext);
  const singularityContext = useContext(SingularityContext);
  const {accessToken} = singularityContext;
  const themes = useSelector(({icatalyst}) => icatalyst.settings.current.themes);
  const toolbarTheme = useOrgPaletteMergedTheme(themes.toolbarTheme);
  const {entityID : roleID} = masterDetailContext;

  // Set up the paths for redirecting to roles or Users
  const rolePath = match?.path;
  // TODO: Setup user path when user exploration is ready
  const userPath = undefined;

  // const handleError = (err)=>{
  //   setResponseErrors(err);
  // };

  const {
    entityDefinition : definition,
    entity,
  } = masterDetailContext;

  const {
    operations,
  } = definition;

  const [errors, setErrors] = useState({});
  const [responseErrors, setResponseErrors] = useState(null);
  // removing role, roleMembers, roleAccess for commenting the relationship ui.
  const [, setRole] = useState(null);
  const [, setRoleMembers] = useState(null);
  const [, setRoleAccess] = useState(null);
  const [modified, setModified] = useState(false);
  const [updating, setUpdating] = useState(false);
  // const [expanded, setExpanded] = useState(null);
  const { form, handleChange, resetForm, setForm } = useForm(null);

  const reset = ()=>{
    setModified(false);
    resetForm();
    // onChange && onChange(form);
  };

  const canBeSubmitted = modified &&
      Object.keys(errors).flatMap(k=>errors[k]).length === 0;

  const saveRole = ()=>{
    const isAdding = entity === null;
    const operation = isAdding ? operations.ADD_ENTITY : operations.UPDATE_ENTITY;

    if (!operation) {
      setResponseErrors([{message : 'Operation not accessible'}]);
      return;
    }

    setUpdating(true);
    setResponseErrors(null);
    dispatch((dispatch, getState)=>{
      const params = isAdding ? (
        definition.getAddParams ?
          definition.getAddParams(getState, form, definition, {
            ...match.params,
            [definition.identityFieldName] : match.params.id
          }, masterDetailContext) : {}
      ) : (
        definition.getUpdateParams ?
          definition.getUpdateParams(getState, masterDetailContext, form) : {}
      );

      return dispatch(operation(form, (err, result)=>{
        setUpdating(false);
        if (err) {
          setResponseErrors(err);
          return;
        }

        setModified(false);
        if (isAdding) {
          definition.onAdded && definition.onAdded(result, dispatch, getState);
        } else {
          definition.onUpdated && definition.onUpdated(result, dispatch, getState);
        }
        history.push(backUrl);
      }, {
        accessToken,
        params,
        ...(!isAdding && definition.updateMethod ? {method : definition.updateMethod} : {})
      }));
    });
  };

  const refreshRoleData = useCallback(()=>{
    if (!roleID) {
      return;
    }

    // MasterDetail resolves the selected role from its loaded entity map using
    // roleID. Use that local entity until the retrieve_entity endpoint exists.
    // This is the single role-loading seam to replace when that API is ready.
    const role = entity;

    setResponseErrors(null);
    setRole(role);
    setForm(role);

    if (role) {
      refreshMembershipData(role);
    }
  }, [roleID, entity]);

  const transformRoleToUserMock = (role)=>{

    return {
      ...role,
      displayName: role.user?.displayName || role.name || role.description || 'Unknown',
      profileImageUri: role.user?.profileImageUri || undefined,
      isRole: !role.user,
      icon: role.user ? undefined : 'group',
      link: ((role.user ? userPath : rolePath) || '').replace(':id', role.guid)
    };
  };

  const refreshMembershipData = useCallback((role)=>{
    if (roleID) {
      setRoleMembers(null);
      return dispatch(operations.getRoleMembers({
        roleID
      }, (err, res)=>{
        if (err) {
          setResponseErrors(err);
        } else {
          setResponseErrors(null);
          // Split this into members and granted access
          const roles = res.reduce((acc, role)=>{
            if (role.edges.find(e=>e.direction === 'in')){
              acc.members.resources.push(transformRoleToUserMock(role));
            }

            if (role.edges.find(e=>e.direction === 'out')){
              acc.access.resources.push(transformRoleToUserMock(role));
            }
            return acc;
          }, {
            members : {
              role: role,
              resources: []
            },
            access: {
              role: role,
              resources: []
            }
          });

          // Sort by type and name
          roles.access.resources.sort((a, b)=>{
            const compareValueA = `${a.resourceType} - ${a.name}`;
            const compareValueB = `${b.resourceType} - ${b.name}`;

            return compareValueA.localeCompare(compareValueB);
          });
          roles.members.resources.sort((a, b)=>{
            const compareValueA = `${a.resourceType} - ${a.name}`;
            const compareValueB = `${b.resourceType} - ${b.name}`;

            return compareValueA.localeCompare(compareValueB);
          });

          setRoleAccess(roles.access);
          setRoleMembers(roles.members);
        }
      }, {
        accessToken: accessToken,
        params : {
        }
      }));
    }
  }, [roleID]);

  console.log({
    canBeSubmitted,
    reset,
    setErrors,
  });

  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState({prev : 0, current : 0});

  useEffect(()=>{
    if (!definition || !entity) {
      return;
    }

    setTabs([{
      icon : definition.icon,
      label : t('{0} Details', definition.label),
      visible : auth && auth.retrieveAll,
    }]);

    if (definition.children) {
      Promise.allSettled(definition.children.map((child)=>{
        return Promise.resolve(child.auth(singularityContext, masterDetailContext))
          .then((childAuth)=>[child, childAuth]);
      })).then((tabAuthResults)=>{
        const childTabs = tabAuthResults
          .filter(({status})=>status === 'fulfilled')
          .map(({value})=>{
            const [child, childAuth] = value;
            const visible = typeof childAuth.retrieveAll === 'boolean' ?
              childAuth.retrieveAll : singularityContext.isInRole(childAuth.retrieveAll);
            return {
              icon : child.icon,
              path : child.name,
              label : child.labelPlural,
              visible,
              definition : child,
              component : child.component || MasterDetailPage,
            };
          }).filter((tab)=>tab.visible);
        setTabs((currentTabs)=>[currentTabs[0], ...childTabs]);
      });
    }
  }, [definition, entity, auth, singularityContext, masterDetailContext, t]);

  useEffect(()=>{
    setSelectedTab((current)=>({
      prev : current.current,
      current : Math.max(0, tabs.findIndex((tab)=>tab.path && location.pathname.startsWith(`${match.url}/${tab.path}`)))
    }));
  }, [tabs, location.pathname, match.url]);

  useEffect(()=>{
    refreshRoleData();
  }, [roleID]);

  // const handleAddResourceClick = ({
  //   roleID
  // })=>{
  //   // TODO: Expand to Roles/Groups
  //   dispatch(DialogActions.openDialog({
  //     title : 'User Details',
  //     children : (
  //       <UserEmailInputDialogContent
  //         onSaved={(value, callback)=>{

  //           // Success useCallback
  //           // Prompt user for email address
  //           const {email} = value;
  //           dispatch(operations.addResourceToRole({
  //             roleID,
  //             email
  //           }, (err)=>{
  //             if (err) {
  //               callback(err);
  //               handleError(err);
  //             } else {
  //               callback();
  //               refreshMembershipData(role);
  //             }
  //           }, {
  //             accessToken,
  //           }));
  //         }}
  //       />
  //     )
  //   }));
  // };

  // function handleAddResourceToRole({
  //   roleID
  // }){
  //   setResponseErrors(null);
  //   handleAddResourceClick({
  //     roleID
  //   });
  // }

  // function handlePromoteRoleResource({
  //   roleID,
  //   resourceID,
  // }){
  //   setResponseErrors(null);
  //   dispatch(operations.promoteRoleResource({
  //     roleID,
  //     resourceID,
  //   }, (err)=>{
  //     if (err) {
  //       handleError(err);
  //     } else {
  //       refreshMembershipData(role);
  //     }
  //   }, {
  //     accessToken
  //   }));
  // }

  // function handleDemoteRoleResource({
  //   roleID,
  //   resourceID,
  // }){
  //   setResponseErrors(null);
  //   dispatch(operations.demoteRoleResource({
  //     roleID,
  //     resourceID,
  //   }, (err)=>{
  //     if (err) {
  //       handleError(err);
  //     } else {
  //       refreshMembershipData(role);
  //     }
  //   }, {
  //     accessToken
  //   }));
  // }

  // function handleRemoveResourceFromRole({
  //   roleID,
  //   resourceID
  // }) {
  //   setResponseErrors(null);
  //   dispatch(operations.removeResourceFromRole({
  //     roleID,
  //     resourceID,
  //   }, (err)=>{
  //     if (err) {
  //       handleError(err);
  //     } else {
  //       refreshMembershipData(role);
  //     }
  //   }, {
  //     accessToken
  //   }));
  // }

  return (
    <div
      className={cxMui(styles.root, className)}
      style={{...style}}
    >
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={toolbarTheme}>
          <div className={cxMui(styles.tabWrapper)}>
            <DetailContentTabs
              config={config}
              tabs={tabs}
              backUrl={backUrl}
              selectedTab={selectedTab}
              onTabChanged={(index)=>{
                setSelectedTab((current)=>({prev : current.current, current : index}));
                const path = tabs[index].path;
                history.push(path ? `${match.url}/${path}` : match.url);
              }}
            />
          </div>
        </MUIThemeProvider>
      </StyledEngineProvider>
      <div className={cxMui(styles.errorWrapper)}>
        {
          responseErrors && <ErrorWrapper className={cxMui(styles.errorWrapperComponent)} errors={responseErrors}/>
        }
      </div>
      <div
        className={cxMui(styles.contentWrapper)}
      >
        <Switch>
          {tabs.filter((tab)=>tab.visible && tab.path).map((tab)=>{
            const Component = tab.component;
            return <Route key={tab.path} path={`${match.path}/${tab.path}`} render={(routeParams)=>(
              <MasterDetailContext.Provider value={{
                parentContext : masterDetailContext,
                entityID : null,
                entity : null,
                entityDefinition : tab.definition,
                updateEntity : null
              }}>
                <Component contained={true} definition={tab.definition} {...routeParams}/>
              </MasterDetailContext.Provider>
            )}/>;
          })}
          <Route render={()=> (
            <div className={cxMui(styles.entityViewWrapper)}>
              {form && <EntityView
                className={cxMui(styles.entityView)}
                definition={definition}
                model={form || entity}
                readonly={readonly || !auth || (entity === null ? !auth.create : !auth.update)}
                errors={errors}
                onChange={(e, valueMap)=>{
                  handleChange(e, valueMap);
                  setModified(true);
                }}
              />}
              {!readonly && auth && (entity === null ? auth.create : auth.update) && (
                <div className={cxMui(styles.actionWrapper)}>
                  <Button
                    className={cxMui(styles.actionButton, 'whitespace-no-wrap normal-case')}
                    variant="contained"
                    color="primary"
                    disabled={updating || !canBeSubmitted}
                    onClick={saveRole}
                  >
                    <Icon className={cxMui(styles.actionButtonIcon)}>save</Icon>
                    Save
                  </Button>
                  <Button
                    className={cxMui(styles.actionButton, 'whitespace-no-wrap normal-case')}
                    variant="contained"
                    color="secondary"
                    disabled={updating || !modified}
                    onClick={reset}
                  >
                    <Icon className={cxMui(styles.actionButtonIcon)}>cancel</Icon>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          )}/>
        </Switch>
        {/* 
        {
          (role && roleMembers) && <RoleComponent
            expanded={expanded === 'members'}
            key={`${role.guid}_members`}
            roleData={roleMembers}
            title={t('Members')}
            showRoles={true}
            onToggleExpand={(e, value)=>{
              setExpanded(value ? 'members' : null);
            }}
            removeResourceFromRole={handleRemoveResourceFromRole}
            addResourceToRole={handleAddResourceToRole}
            demoteRoleResource={handleDemoteRoleResource}
            promoteRoleResource={handlePromoteRoleResource}
          />
        }

        {
          (role && roleAccess) && <RoleComponent
            expanded={expanded === 'access'}
            key={`${role.guid}_access`}
            roleData={roleAccess}
            showRoles={true}
            title={t('Grants Access to')}
            onToggleExpand={(e, value)=>{
              setExpanded(value ? 'access' : null);
            }}
          />
        }

        { (!roleMembers || !role || !roleAccess) && (
          <FuseLoading/>
        )} */}
      </div>
    </div>
  );
};

RoleManagement.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  auth : PropTypes.shape({
    create : PropTypes.bool,
    retrieve : PropTypes.bool,
    update : PropTypes.bool,
    delete : PropTypes.bool,
    retrieveAll : PropTypes.bool,
    route : PropTypes.bool,
  }),
  backUrl :PropTypes.string,
  config : PageBase.propTypes.config,
  readonly: PropTypes.bool,
  match : PropTypes.object,
  history : PropTypes.shape({
    push : PropTypes.func.isRequired,
  }).isRequired,
  location : PropTypes.shape({
    pathname : PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(RoleManagement);
