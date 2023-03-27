import React, {useContext, useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';
import { useSelector, useDispatch } from 'react-redux';
import {SingularityContext} from '../../../Singularity';
import {MasterDetailContext} from '../../../MasterDetail';
import {isSafari} from 'react-device-detect';
import {ThemeProvider} from '@material-ui/core';
import DetailContentTabs from '../../../MasterDetail/DetailContentTabs';
import PageBase from '../../../../pages/PageBase';
import RoleComponent from '../OrganisationUserManagement/RoleComponent';
import UserEmailInputDialogContent from '../UserEmailInputDialogContent';
import FuseLoading from '../../../fuse/FuseLoading';
import ErrorWrapper from '../../../Errors/ErrorWrapper';
import EntityView from '../../../EntityView';
import {useForm} from '../../../../hooks/fuse';
import { withRouter } from 'react-router-dom';
import * as DialogActions from '../../../../store/actions/dialog.actions';


const useStyles = makeStyles((theme)=>{
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
      padding: theme.spacing(2),
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
})=>{
  const styles = useStyles();

  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  const masterDetailContext = useContext(MasterDetailContext);
  const {accessToken} = useContext(SingularityContext);
  const themes = useSelector(({icatalyst}) => icatalyst.settings.current.themes);
  const {entityID : roleID} = masterDetailContext;

  // Set up the paths for redirecting to roles or Users
  const rolePath = match?.path;
  // TODO: Setup user path when user exploration is ready
  const userPath = undefined;

  const handleError = (err)=>{
    setResponseErrors(err);
  };

  const {
    entityDefinition : definition,
    entity,
  } = masterDetailContext;

  const {
    operations,
  } = definition;

  const [errors, setErrors] = useState({});
  const [responseErrors, setResponseErrors] = useState(null);
  const [role, setRole] = useState(null);
  const [roleMembers, setRoleMembers] = useState(null);
  const [roleAccess, setRoleAccess] = useState(null);
  const [modified, setModified] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const { form, handleChange, resetForm, setForm } = useForm(null);

  const reset = ()=>{
    setModified(false);
    resetForm();
    // onChange && onChange(form);
  };

  const canBeSubmitted = modified &&
      Object.keys(errors).flatMap(k=>errors[k]).length === 0;

  const refreshRoleData = useCallback(()=>{
    if (roleID) {
      setRole(null);
      return dispatch(operations['RETRIEVE_ENTITY'](roleID, (err, res)=>{
        if (err) {
          setResponseErrors(err);
        } else {
          setResponseErrors(null);
          setRole(res);
          setForm(res);
          refreshMembershipData(res);
        }
      }, {
        accessToken: accessToken,
        params : {}
      }));
    }
  }, [roleID]);

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
  const selectedTab = {
    prev : 0,
    current : 0
  };

  useEffect(()=>{
    if (!definition || !entity) {
      return;
    }

    setTabs([{
      icon : definition.icon,
      label : t('{0} Details', definition.label),
      visible : auth && auth.retrieveAll,
    }]);
  }, [definition, entity]);

  useEffect(()=>{
    refreshRoleData();
  }, [definition, entity]);

  const handleAddResourceClick = ({
    roleID
  })=>{
    // TODO: Expand to Roles/Groups
    dispatch(DialogActions.openDialog({
      title : 'User Details',
      children : (
        <UserEmailInputDialogContent
          onSaved={(value, callback)=>{

            // Success useCallback
            // Prompt user for email address
            const {email} = value;
            dispatch(operations.addResourceToRole({
              roleID,
              email
            }, (err)=>{
              if (err) {
                callback(err);
                handleError(err);
              } else {
                callback();
                refreshMembershipData(role);
              }
            }, {
              accessToken,
            }));
          }}
        />
      )
    }));
  };

  function handleAddResourceToRole({
    roleID
  }){
    setResponseErrors(null);
    handleAddResourceClick({
      roleID
    });
  }

  function handlePromoteRoleResource({
    roleID,
    resourceID,
  }){
    setResponseErrors(null);
    dispatch(operations.promoteRoleResource({
      // Note we are switching around due to graph direction
      roleID : resourceID,
      resourceID : roleID,
    }, (err)=>{
      if (err) {
        handleError(err);
      } else {
        refreshMembershipData(role);
      }
    }, {
      accessToken
    }));
  }

  function handleDemoteRoleResource({
    roleID,
    resourceID,
  }){
    setResponseErrors(null);
    dispatch(operations.demoteRoleResource({
      // Note we are switching around due to graph direction
      roleID : resourceID,
      resourceID : roleID,
    }, (err)=>{
      if (err) {
        handleError(err);
      } else {
        refreshMembershipData(role);
      }
    }, {
      accessToken
    }));
  }

  function handleRemoveResourceFromRole({
    roleID,
    resourceID
  }) {
    setResponseErrors(null);
    dispatch(operations.removeResourceFromRole({
      // Note we are switching around due to graph direction
      roleID : resourceID,
      resourceID : roleID,
    }, (err)=>{
      if (err) {
        handleError(err);
      } else {
        refreshMembershipData(role);
      }
    }, {
      accessToken
    }));
  }

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <ThemeProvider theme={themes.toolbarTheme}>
        <div className={clsx(styles.tabWrapper)}>
          <DetailContentTabs
            config={config}
            tabs={tabs}
            backUrl={backUrl}
            selectedTab={selectedTab}
            onTabChanged={()=>{
              // Nothing to do
            }}
          />
        </div>
      </ThemeProvider>

      <div className={clsx(styles.errorWrapper)}>
        {
          responseErrors && <ErrorWrapper className={clsx(styles.errorWrapperComponent)} errors={responseErrors}/>
        }
      </div>

      <div
        className={clsx(styles.contentWrapper)}
      >
        <div
          className={clsx(styles.entityViewWrapper)}
        >

          {form && <EntityView
            className={clsx(styles.entityView)}
            definition={definition}
            model={form || entity}
            readonly={readonly || !auth || !auth.update || (!auth.create /* && !isNew */)}
            errors={errors}
            onChange={(e, valueMap)=>{
              handleChange(e, valueMap);
              setModified(true);
              // onChange && onChange(form);
            }}
          />}

        </div>

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
        )}
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
};

export default withRouter(RoleManagement);
