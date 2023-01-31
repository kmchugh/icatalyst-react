import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Icon from '../../../../Icon';
import Avatar from '../../../../Avatar';
import IconButton from '../../../../IconButton';
import {LocalizationContext} from '../../../../../localization/LocalizationProvider';

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(0),
      transition   : theme.transitions.create(['margin-bottom', 'margin-top'], {
        easing  : theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
      }),
    },
    root_expanded : {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    autoLeft: {
      marginLeft: 'auto'
    },
    accordion: {

    },
    accordion_expanded : {

    },
    accordionSummary : {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    accordionContent: {
      width: '100%'
    },
    avatar: {
      height: theme.spacing(6),
      width: theme.spacing(6)
    },
    resourceList: {
      backgroundColor: theme.palette.background.default,
      borderTop: `thin solid ${theme.palette.divider}`,
      marginTop: theme.spacing(3),
      maxHeight: theme.spacing(45),
      width: '100%',
      overflow: 'auto'
    },
    resourceListItem: {
      '&:hover' : {
        backgroundColor: theme.palette.action.focus
      }
    },
    listItemresourceName : {

    },
    listItemresourceName_owner : {
      '& .MuiTypography-root' : {
        fontWeight: 'bold'
      }
    }
  };
});

const RoleComponent = ({
  className,
  style = {},
  roleData = {},
  expanded = false,
  onToggleExpand,
  title,
  description,
  addresourceToRole,
  promoteRoleresource,
  demoteRoleresource,
  removeresourceFromRole,
  showRoles = false,
})=>{
  const styles = useStyles();

  const {t} = useContext(LocalizationContext);

  const {role, resources} = roleData;

  console.log({showRoles});

  return (
    <div
      className={clsx(
        styles.root,
        expanded && styles.root_expanded,
        className
      )}
      style={{...style}}
    >
      <Accordion
        expanded={expanded}
        className={clsx(
          styles.accordion,
          expanded && styles.accordion_expanded,
          styles.accordionHeading
        )}
        onChange={(event, value)=>{
          onToggleExpand && onToggleExpand(event, value);
        }}
      >
        <AccordionSummary
          expandIcon={(
            <Icon
              color="action"
              size="medium"
            >
              keyboard_arrow_down
            </Icon>
          )}
          aria-controls={`${role.guid}_summary`}
          id={`${role.guid}_header`}
        >
          <div
            className={clsx(styles.accordionSummary)}
          >
            <Typography
              noWrap={true}
              className={clsx(styles.accordionHeading)}
              component="h3"
              variant="h5"
            >
              {title || role.name}
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div className={clsx(styles.accordionContent)}>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {description || role.description}
            </Typography>
            <List
              className={clsx(styles.resourceList)}
            >
              {resources.map(resource=>{
                const {edges} = resource;
                const isOwner = Boolean(edges.find(et=>et.edgeType.code === 'SINGULARITY_OWNER_EDGE'));

                return (
                  <ListItem
                    className={clsx(styles.resourceListItem)}
                    key={resource.guid}
                  >
                    <ListItemIcon>
                      <Avatar
                        className={clsx(styles.avatar)}
                        border={false}
                        alt={(resource.displayName) || t('resource profile image')}
                        src={resource.profileImageUri}
                      />
                    </ListItemIcon>
                    <ListItemText
                      className={clsx(
                        styles.listItemresourceName,
                        isOwner && styles.listItemresourceName_owner,
                      )}
                      primary={`${resource.displayName}${(isOwner && ` (${t('admin')})`) || ''}`}
                    />
                    <ListItemIcon>
                      <Button
                        variant="outlined"
                        disabled={(isOwner && !demoteRoleresource) || (!isOwner && !promoteRoleresource)}
                        onClick={(e)=>{
                          e.stopPropagation();
                          e.preventDefault();
                          if (isOwner) {
                            demoteRoleresource && demoteRoleresource({
                              resourceID: resource.guid,
                              roleID: role.guid,
                            });
                          } else {
                            promoteRoleresource && promoteRoleresource({
                              resourceID: resource.guid,
                              roleID: role.guid,
                            });
                          }
                        }}
                      >
                        {isOwner ? t('Clear Admin') : t('Set as Admin') }
                      </Button>
                    </ListItemIcon>
                    <ListItemIcon>
                      <IconButton
                        size="medium"
                        title={t('delete resource')}
                        icon="delete"
                        disabled={!removeresourceFromRole}
                        onClick={(e)=>{
                          e.stopPropagation();
                          e.preventDefault();

                          removeresourceFromRole && removeresourceFromRole({
                            roleID: role.guid,
                            resourceID: resource.guid,
                          });
                        }}
                      />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </AccordionDetails>
        <AccordionDetails>
          <Button
            className={clsx(styles.autoLeft)}
            variant="outlined"
            color="primary"
            disabled={!addresourceToRole}
            onClick={(e)=>{
              e.stopPropagation();
              e.preventDefault();

              addresourceToRole && addresourceToRole({
                roleID: role.guid
              });
            }}
          >
            Add resource
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

RoleComponent.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  roleData: PropTypes.object,
  expanded: PropTypes.bool,
  onToggleExpand: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  addresourceToRole: PropTypes.func,
  promoteRoleresource: PropTypes.func,
  demoteRoleresource: PropTypes.func,
  removeresourceFromRole: PropTypes.func,
  showRoles: PropTypes.bool
};

export default RoleComponent;
