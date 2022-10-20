import React, {useContext, useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {SingularityContext} from '@icatalyst/components/Singularity';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@icatalyst/components/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import * as DActions from '@icatalyst/store/actions/dialog.actions';
import { useDispatch } from 'react-redux';
import {DialogContent} from '@icatalyst/components/Dialogs';
import EntityView from '@icatalyst/components/EntityView';
import { useForm } from 'app/common/hooks/Fuse';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
    },
    roleSelection : {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconButton: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    constraintLimit : {
      marginRight: theme.spacing(2),
      minWidth: theme.spacing(8),
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    constraintLimitText : {
      fontWeight: 'bold',
    },
    constraintList : {
    },
    constraintListItem : {
    },
    constraintText:{

    },
    constraintTextDefault: {
      '& .MuiListItemText-primary' : {
        fontWeight: 'bold'
      }
    }
  };
});

const LicenceConstraints = ({
  className,
  style = {},
  onChange,
  // value,
  field,
  // readonly,
})=>{
  const styles = useStyles();
  const [constraints, setConstraints] = useState({});
  // This is a hack to get autocomplete to clear after selection
  const [selectedRole, setSelectedRole] = useState(null);
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(null);

  useEffect(()=>{
    const value = Object.entries(constraints).map(([key, value])=>{
      return {
        name: value.name,
        description: value.description,
        relations: [{
          relationshipTypeID : value.relationshipTypeID,
          roleID: key
        }]
      };
    });

    // TODO: Reduce to required shape for api
    onChange && onChange({
      target : {
        name : field.id,
        value : value.length > 0 ? value : null
      }
    });

    setSelectedRole(null);
  }, [constraints]);

  const {user} = useContext(SingularityContext);

  const roles = useMemo(()=>{
    if (user) {
      return user.roles.filter(r=>{
        return r.accessrole && r.displayable;
      });
    } else {
      return [];
    }
  }, [user]);

  const searchableRoles = useMemo(()=>{
    return roles.filter(r=>!constraints[r.guid]);
  }, [roles, constraints]);

  const constraintRoles = useMemo(()=>{
    return Object.entries(constraints)
      .map(([key, role])=>({
        guid : key,
        ...role
      })).sort();
  }, [constraints]);

  const handleToggleDefault = (roleID)=>{
    setConstraints((state)=>{
      const updatedState = Object.entries(state).reduce((acc, [key, stateConstraint])=>{
        acc[key] = {
          ...stateConstraint,
          isDefault : false
        };
        return acc;
      }, {});
      updatedState[roleID].isDefault = true;
      return updatedState;
    });
  };

  const handleAddRole = (selectedRole)=>{
    if (selectedRole) {
      setConstraints((state)=>{
        if (!state[selectedRole.guid]) {
          return {
            ...state,
            [selectedRole.guid] : {
              name: selectedRole.name,
              description: selectedRole.description,
              relationshipTypeID: 'member',
              limit: 999,
              isDefault : Object.keys(state).length === 0
            }
          };
        } else {
          return state;
        }
      });
    }
  };

  const handleLimitChanged = (roleID, limit)=>{
    setConstraints((state)=>{
      const updated = {
        ...state
      };
      if (updated[roleID]) {
        updated[roleID].limit = limit;
      }
      return updated;
    });
  };

  const handleRemoveRole = (roleID)=>{
    setConstraints((state)=>{
      const updatedState = Object.entries(state)
        .filter(([key])=>key !== roleID)
        .reduce((acc, [key, stateConstraint])=>{
          acc[key] = {
            ...stateConstraint,
          };
          return acc;
        }, {});
      // Make sure we have a default
      if (!Object.values(updatedState).find(c=>c.isDefault)) {
        const keys = Object.keys(updatedState);
        if (keys.length > 0) {
          updatedState[keys[0]].isDefault = true;
        }
      }
      return updatedState;
    });
  };

  useEffect(()=>{
    if (form) {
      dispatch(DActions.openDialog({
        title: form.name,
        allowClose : true,
        children : (
          <DialogContent
            className={clsx(styles.dialog)}
            hideCloseButton={true}
            actions={
              [
                {
                  title: 'Apply',
                  color: 'primary',
                  icon: 'done',
                  disabled: form.limit <= 0,
                  onClick: ()=> {
                    handleLimitChanged(form.guid, form.limit);
                    dispatch(DActions.closeDialog());
                  }
                },
                {
                  title: 'Cancel',
                  color: 'secondary',
                  onClick: ()=> {
                    dispatch(DActions.closeDialog());
                  }
                }
              ]
            }
          >
            {
              <EntityView
                className={clsx('min-w-sm md:min-width-md')}
                definition={{
                  name : 'roleConstraint',
                  layout: ['limit'],
                  fields : {
                    limit : {
                      id : 'limit',
                      label: 'limit',
                      type: 'number',
                    }
                  }
                }}
                hideReadOnly={true}
                model={form}
                onChange={handleChange}
              />
            }
          </DialogContent>
        )
      }));
    }
  }, [form]);

  const handleEditConstraint = (constraintID)=>{
    // Show a dialog with the input field
    const constraint = constraints[constraintID];
    setForm({
      guid: constraintID,
      name : constraint.name,
      limit : constraint.limit,
    });
  };

  return (
    <div
      className={clsx(styles.root, className)}
      style={{...style}}
    >
      <Typography>Select Roles to add to this Licence</Typography>
      <Autocomplete
        placeholder="Select a role to add..."
        icon="search"
        fullWidth
        value={selectedRole}
        onChange={(e, item)=>{
          setSelectedRole(item);
          handleAddRole(item);
        }}
        options={searchableRoles}
        getOptionLabel={(role)=>{
          return role.name;
        }}
        renderInput={(params)=>{
          return (
            <TextField {...params}
              inputProps={{
                ...params.inputProps,
                value: params.inputProps.value
              }}
              variant="outlined" />
          );
        }}
      />

      <List className={clsx(styles.constraintList)}>
        {
          constraintRoles.map((r)=>{
            const isDefault = r.isDefault;
            const constraintLimit = constraints[r.guid] ? constraints[r.guid].limit : 0;
            return (
              <ListItem key={r.guid} className={clsx(styles.constraintListItem)}>
                <ListItemAvatar>
                  <Tooltip
                    title={isDefault ? 'New Users will be added to this role' : ''}
                  >
                    <Checkbox
                      checked={isDefault}
                      onChange={()=>{
                        handleToggleDefault(r.guid);
                      }}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Tooltip>
                </ListItemAvatar>
                <div
                  className={clsx(styles.constraintLimit)}
                >
                  <Typography
                    className={clsx(styles.constraintLimitText)}
                  >
                    {constraintLimit}
                  </Typography>
                  <IconButton
                    className={clsx(styles.iconButton)}
                    size="small"
                    icon="edit"
                    onClick={()=>{
                      handleEditConstraint(r.guid);
                    }}
                    color="primary"
                  />
                </div>
                <ListItemText
                  className={clsx(styles.constraintText, isDefault && styles.constraintTextDefault)}
                  primary={r.name}
                  secondary={r.description}
                />
                <IconButton
                  className={clsx(styles.iconButton)}
                  size="small"
                  icon="delete"
                  onClick={()=>handleRemoveRole(r.guid)}
                  color="primary"
                />
              </ListItem>
            );
          })
        }
      </List>
    </div>
  );
};

LicenceConstraints.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object,
};

export default LicenceConstraints;
