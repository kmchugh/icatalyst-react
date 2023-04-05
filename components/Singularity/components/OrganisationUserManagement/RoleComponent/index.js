import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import Icon from '../../../../Icon';
import Avatar from '../../../../Avatar';
import IconButton from '../../../../IconButton';
import {LocalizationContext} from '../../../../../localization/LocalizationProvider';
import {Link} from 'react-router-dom';

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
    },
    resourceIcon: {
      background: theme.palette.divider,
      width: theme.spacing(6),
      height: theme.spacing(6),
      padding: theme.spacing(.75),
      borderRadius: '50%',
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
  addResourceToRole,
  promoteRoleResource,
  demoteRoleResource,
  removeResourceFromRole,
})=>{
  const styles = useStyles();

  const {t} = useContext(LocalizationContext);

  const {role, resources} = roleData;

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
                const {icon, resourceType, link} = resource;

                let displayResourceType = ((resourceType && resourceType.split('.').pop()) || 'user').toLowerCase();
                if (displayResourceType === 'rolenode') {
                  displayResourceType = 'role';
                }
                displayResourceType = t(displayResourceType);

                const hasLink = link && link !== '';
                const resourceText = `${resource.displayName}${(isOwner && ` (${t('admin')})`) || ''}`;

                return (
                  <ListItem
                    className={clsx(styles.resourceListItem)}
                    key={resource.guid}
                  >
                    <ListItemIcon>
                      {!icon && <Avatar
                        className={clsx(styles.avatar)}
                        border={false}
                        alt={(resource.displayName) || t('resource profile image')}
                        src={resource.profileImageUri}
                      />}
                      {icon && (
                        <Icon
                          size="large"
                          className={clsx(styles.resourceIcon)}
                        >
                          {icon}
                        </Icon>
                      )}
                    </ListItemIcon>
                    <ListItemText
                      className={clsx(
                        styles.listItemresourceName,
                        isOwner && styles.listItemresourceName_owner,
                      )}
                      primary={
                        hasLink ?
                          (
                            <Link
                              to={link}
                            >
                              {resourceText}
                            </Link>
                          ) :
                          resourceText
                      }
                    />
                    <ListItemIcon>
                      <Button
                        variant="outlined"
                        disabled={(isOwner && !demoteRoleResource) || (!isOwner && !promoteRoleResource)}
                        onClick={(e)=>{
                          e.stopPropagation();
                          e.preventDefault();
                          if (isOwner) {
                            demoteRoleResource && demoteRoleResource({
                              resourceID: resource.guid,
                              roleID: role.guid,
                            });
                          } else {
                            promoteRoleResource && promoteRoleResource({
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
                        title={t('remove {0}', displayResourceType)}
                        icon="delete"
                        disabled={!removeResourceFromRole}
                        onClick={(e)=>{
                          e.stopPropagation();
                          e.preventDefault();

                          removeResourceFromRole && removeResourceFromRole({
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
            disabled={!addResourceToRole}
            onClick={(e)=>{
              e.stopPropagation();
              e.preventDefault();

              addResourceToRole && addResourceToRole({
                roleID: role.guid
              });
            }}
          >
            Add user
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
  addResourceToRole: PropTypes.func,
  promoteRoleResource: PropTypes.func,
  demoteRoleResource: PropTypes.func,
  removeResourceFromRole: PropTypes.func
};

export default RoleComponent;
