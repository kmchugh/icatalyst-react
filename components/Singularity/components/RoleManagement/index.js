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
import FuseLoading from '../../../fuse/FuseLoading';
import ErrorWrapper from '../../../Errors/ErrorWrapper';
import EntityView from '../../../EntityView';
import {useForm} from '../../../../hooks/fuse';

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
})=>{
  const styles = useStyles();

  const dispatch = useDispatch();
  const {t} = useContext(LocalizationContext);
  const masterDetailContext = useContext(MasterDetailContext);
  const {accessToken} = useContext(SingularityContext);
  const themes = useSelector(({icatalyst}) => icatalyst.settings.current.themes);
  const {entityID : roleID} = masterDetailContext;

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
      icon: role.user ? undefined : 'group'
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
    errors,
    setErrors
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
          roleMembers && <RoleComponent
            expanded={expanded === 'members'}
            key={`${role.guid}_members`}
            roleData={roleMembers}
            title={t('Members')}
            showRoles={true}
            onToggleExpand={(e, value)=>{
              setExpanded(value ? 'members' : null);
            }}
          />
        }

        {
          roleAccess && <RoleComponent
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
};

export default RoleManagement;
