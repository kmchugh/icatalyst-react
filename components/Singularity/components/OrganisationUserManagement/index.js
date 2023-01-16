import React, {useContext, useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {LocalizationContext} from '../../../../localization/LocalizationProvider';
import { MasterDetailContext} from '../../../MasterDetail';
import { useSelector, useDispatch } from 'react-redux';
import {SingularityContext} from '../../../Singularity';
import FuseLoading from '../../../fuse/FuseLoading';
import ErrorWrapper from '../../../Errors/ErrorWrapper';
import RoleComponent from './RoleComponent';
import StatsComponent from './StatsComponent';
import {definition as organisationStatsDefinition} from '../../store/reducers/organisationStats.reducer';
import * as DialogActions from '../../../../store/actions/dialog.actions';
import UserEmailInputDialogContent from '../UserEmailInputDialogContent';

import {
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 0,
      padding: theme.spacing(2),
      maxHeight: '100%',
      overflow: 'auto',
    },
    errorWrapper: {
      padding: 0,
      flexShrink: 1,
      flexGrow: 0,
    },
    errorWrapperComponent: {
      padding: 0,
    },
  };
});

const OrganisationUserManagement = ({
  className,
  style = {},
  definition = null,
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();

  const singularityContext = useContext(SingularityContext);
  const {accessToken} = singularityContext;

  const {t} = useContext(LocalizationContext);
  const parentMasterDetailContext = useContext(MasterDetailContext);
  definition = definition || parentMasterDetailContext.entityDefinition;
  const parentDefinition = parentMasterDetailContext.parentContext.entityDefinition;
  const parentEntity = parentMasterDetailContext.parentContext.entity;
  const organisationID = parentEntity.guid;
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState(null);

  const {
    title,
    operations,
    getReducerRoot = ()=>{
      console.warn(`You have not set a selector root for definition ${title}`);
    },
  } = definition;

  const data = useSelector(getReducerRoot);
  const uniqueUsers = data.entities.reduce((acc, {users})=>{
    users.forEach((user)=>{
      acc[user.guid] = user;
    });
    return acc;
  }, {});

  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const {
    addUserToRole,
    demoteRoleUser,
    promoteRoleUser,
    removeUserFromRole,
  } = definition.operations;

  const refreshUserData = useCallback(()=>{
    setLoading(true);
    return dispatch(operations['RETRIEVE_ENTITIES'](()=>{
      setLoading(false);
    }, {
      accessToken: accessToken,
      params : {
        ...(definition.getRetrieveAllParams ? definition.getRetrieveAllParams(
          parentDefinition,
          parentEntity,
        ) : {})
      }
    }));
  }, [parentEntity, parentDefinition, definition]);

  // Load the organisation roles and users
  useEffect(()=>{
    /*const result = */refreshUserData();

    // return (()=>{
    //   if (result && result.cancelToken) {
    //     result.cancelToken.cancel('Unloading');
    //   }
    // });

  }, []);

  const handleAddUserClick = ({
    organisationID,
    roleID
  })=>{
    dispatch(DialogActions.openDialog({
      title : 'User Details',
      children : (
        <UserEmailInputDialogContent
          onSaved={(value, callback)=>{

            // Success useCallback
            // Prompt user for email address
            const {email} = value;
            addUserToRole && dispatch(addUserToRole({
              roleID,
              organisationID,
              email
            }, (err)=>{
              if (err) {
                callback(err);
                handleError(err);
              } else {
                callback();
                refreshUserData();
              }
            }, {
              accessToken,
            }));
          }}
        />
      )
    }));
  };

  useEffect(()=>{
    if (!organisationID) {
      setStats(null);
    } else {
      setLoadingStats(true);
      dispatch(organisationStatsDefinition.operations['RETRIEVE_ENTITIES']((err, res)=>{
        setLoadingStats(false);
        if (err) {
          setStats(null);
        } else {
          setStats(Array.isArray(res) ? res[0] : res);
        }
      }, {
        accessToken: accessToken,
        params : {
          organisationID : organisationID
        }
      }));
    }
  }, [organisationID]);

  const handleError = (err)=>{
    setErrors(err);
  };

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <div className={clsx(styles.errorWrapper)}>
        {
          (errors && errors.length > 0) && <ErrorWrapper className={clsx(styles.errorWrapperComponent)} errors={errors}/>
        }
      </div>
      <div
        className={clsx(styles.licenceSection)}
      >
        <Typography
          className={clsx(styles.accordionHeading)}
          gutterBottom={true}
          component="h2"
          variant="h4"
        >
          {t('Licence')}
        </Typography>
        {loadingStats && <FuseLoading title={t('Loading...')}/>}
        {stats && (
          <StatsComponent
            licence={stats.licence}
            licenceKey={stats.licenceKey}
            organisation={stats.organisation}
            stats={
              [...(stats?.stats || []), {
                name: t('Users'),
                stat: Object.keys(uniqueUsers).length,
              }]
            }
          />
        )}
      </div>
      <div
        className={clsx(styles.rolesSection)}
      >
        <Typography
          className={clsx(styles.accordionHeading)}
          gutterBottom={true}
          component="h2"
          variant="h4"
        >
          {t('Roles')}
        </Typography>
        {loading && <FuseLoading title={t('Loading...')}/>}
        {!loading && data.entities
          .sort((a, b)=>a.role.name.localeCompare(b.role.name))
          .map((entity, index)=>{
            return (
              <RoleComponent
                key={entity.role.guid}
                title={entity.role.name.replace(`${parentEntity.name} - `, '').replace(`${parentEntity.name} `, '')}
                roleData={entity}
                expanded={(expanded === null && index === 0) || expanded === entity.role.guid}
                onToggleExpand={(event, value)=>{
                  setExpanded(value ? entity.role.guid : null);
                }}
                addUserToRole={({
                  roleID
                })=>{
                  setErrors(null);
                  if (addUserToRole) {
                    handleAddUserClick({
                      organisationID,
                      roleID
                    });
                  }
                }}
                promoteRoleUser={({
                  roleID,
                  userID,
                })=>{
                  setErrors(null);
                  promoteRoleUser && dispatch(promoteRoleUser({
                    userID,
                    roleID,
                    organisationID
                  }, (err)=>{
                    if (err) {
                      handleError(err);
                    } else {
                      refreshUserData();
                    }
                  }, {
                    accessToken,
                  }));
                }}
                demoteRoleUser={({
                  roleID,
                  userID,
                })=>{
                  setErrors(null);
                  demoteRoleUser && dispatch(demoteRoleUser({
                    userID,
                    roleID,
                    organisationID
                  }, (err)=>{
                    if (err) {
                      handleError(err);
                    } else {
                      refreshUserData();
                    }
                  }, {
                    accessToken,
                  }));
                }}
                removeUserFromRole={({
                  roleID,
                  userID,
                })=>{
                  setErrors(null);
                  removeUserFromRole && dispatch(removeUserFromRole({
                    userID,
                    roleID,
                    organisationID
                  }, (err)=>{
                    if (err) {
                      handleError(err);
                    } else {
                      refreshUserData();
                    }
                  }, {
                    accessToken,
                  }));
                }}
              />
            );
          })
        }
      </div>
    </div>
  );
};

OrganisationUserManagement.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  match : PropTypes.object,
  location : PropTypes.object,
  contained : PropTypes.bool,
  definition : PropTypes.object
};

export default OrganisationUserManagement;
