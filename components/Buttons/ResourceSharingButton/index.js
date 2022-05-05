import React, {useState, useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import IconButton from '../../IconButton';
import _ from '../../../@lodash';
import { SingularityContext } from '../../Singularity';
import { Wizard } from '../../Wizard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from '../../../@moment';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {definition as resourceInviteDefinition } from '../../Singularity/store/reducers/resourceInvite.reducer';
import {definition as inviteDefinition } from '../../Singularity/store/reducers/invites.reducer';
import {useDispatch} from 'react-redux';
import Icon from '@icatalyst/components/Icon';
import EdgeTypeSelection from '../../Singularity/components/EdgeTypeSelection';
import { AppContext } from '../../../contexts/App';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((/*theme*/)=>{
  return {
    root : {},
    page1 : {
      display: 'flex',
      flexDirection : 'column'
    },
    cardHeader : {
      overflow : 'hidden',
      ['& .MuiCardHeader-content'] : {
        overflow : 'hidden'
      }
    },
    cardMedia : {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardContent : {
      flexGrow: 1,
    },
    listItem : {
      width: '100%',
      padding : 0,
    }
  };
});

const ResourceSharingButton = ({
  className,
  definition,
  resource,
  iconButtonProps = {},
  isOwner = null,
  disabled = false,
  onClosed,
  additionalResources = [],
  onSaved,
  variant = 'iconbutton',
  accessTypeProps = {},
  label,
  open = false,
})=>{
  const styles = useStyles();
  const history = useHistory();
  const iconButtonDefaults = {
    size : 'small',
    title : label || `Share ${definition.label.replace(/\b\w/g, c => c.toUpperCase())}`,
    icon : 'ios_share',
    color : 'primary',
  };
  const iconProps = _.merge({}, iconButtonDefaults, iconButtonProps);
  const [showWizard, setShowWizard] = useState(open);
  const [resourceOwner, setResourceOwner] = useState(isOwner);

  const authContext = useContext(SingularityContext);
  const {isResourceOwner, accessToken} = authContext;
  const wizardRef = useRef(null);
  const dispatch = useDispatch();
  const {reverse} = useContext(AppContext);

  onSaved = onSaved || (()=>{
    // Navigate to the invites page
    history.push(reverse('invites'));
  });

  useEffect(()=>{
    if (resource && !resourceOwner) {
      isResourceOwner(
        definition.resourceName || definition.name,
        definition.getIdentity(resource)).then((isOwner)=>{
        setResourceOwner(isOwner);
      });
    }
  }, [resource, isOwner]);

  useEffect(()=>{
    if (open !== showWizard) {
      setShowWizard(open);
    }
  }, [open]);

  const handleClick = (e)=>{
    e.stopPropagation();
    if (iconProps.onClick) {
      iconProps.onClick(e);
    } else {
      // Show the dialog
      setShowWizard(true);
    }
  };

  const featureImage = definition.getFeatureImage(resource);
  const primaryText = definition.getPrimaryText(resource);
  const secondaryText = definition.getSecondaryText(resource);
  const resourceID = definition.getIdentity(resource);
  const resourceType = definition.resourceName ? definition.resourceName : definition.name;

  return resourceOwner ? (
    <div className={clsx(styles.root, className)}>
      <Wizard
        ref={wizardRef}
        finishButtonIcon="email"
        finishButtonText="Send"
        entity={{
          emails : [],
          resourceType : resourceType,
          resourceDescription : primaryText,
          resourceID : resourceID,
          start : null,
          expiry : null,
          edgeTypes : null
        }}
        definition={resourceInviteDefinition}
        className={clsx(styles.wizard)}
        open={showWizard}
        title={iconProps.title}
        onClosed={()=>{
          setShowWizard(false);
          onClosed && onClosed();
        }}
        onSave={(data, callback)=>{
          const payload = {
            emails : data.emails,
            resources : [
              {
                resourceType : data.resourceType,
                resourceDescription : data.resourceDescription,
                resourceID : data.resourceID,
                start : data.start,
                expiry : data.expiry,
                edgeTypes : data.edgeTypes
              },
              ...additionalResources.map((r)=>{
                return {
                  start : data.start,
                  expiry : data.expiry,
                  ...r,
                };
              })
            ]
          };
          dispatch(inviteDefinition.operations['ADD_ENTITY'](payload, (err, res)=>{
            callback && callback(err, res);
            !err && onSaved && onSaved(res);
          }, {
            accessToken : accessToken
          }));
        }}
        pageLayouts={[{
          // showTitle : false,
          actions : [{
            key : 'cancel',
            color : 'secondary',
            disabled : false,
            onClick : ()=>{
              wizardRef.current && wizardRef.current.cancelWizard();
            },
            icon : 'close',
            title : 'Cancel'
          }, {
            key : 'next',
            color : 'primary',
            disabled : !wizardRef.current || !wizardRef.current.isCurrentPageValid(),
            onClick : ()=>{
              wizardRef.current && wizardRef.current.nextPage();
            },
            icon : 'arrow_forward',
            title : 'Next'
          }],
          hideCloseButton : true,
          participateInProgress : false,
          showProgress : false,
          minHeight : 350,
          layout : [()=>{
            return (
              <div key="intro" className={clsx(styles.page1)}>

                {featureImage && (
                  <CardMedia
                    className={clsx(styles.cardMedia)}
                    image={featureImage}
                    title={primaryText}
                  />
                )}

                <CardContent
                  className={clsx(styles.cardContent)}
                >
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    component="p">
                    {primaryText}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {secondaryText}
                  </Typography>

                </CardContent>
              </div>
            );
          }]
        }, {
          title : 'Who are you sharing with?',
          subtitle : 'Who',
          hideCloseButton : true,
          minHeight: 350,
          layout : ['emails']
        }, {
          title : 'What access are you assigning?',
          subtitle : 'Access',
          hideCloseButton : true,
          minHeight: 350,
          layout : [
            (data)=>{
              return <EdgeTypeSelection
                key="edgetypeselection"
                field={resourceInviteDefinition.fields['edgeTypes']}
                accessTypeProps={accessTypeProps}
                value={data.edgeTypes}
                onChange={wizardRef.current.handleChange}
              />;
            }
          ]
        }, {
          title : 'When should access start and expire?',
          subtitle : 'Dates',
          hideCloseButton : true,
          minHeight: 350,
          layout : [
            ()=>{
              return (
                <Typography
                  key="title"
                  variant="body2"
                  color="textSecondary"
                  component="p">
                  Choosing dates is optional, if you do not choose dates then access will be granted immediately and will never expire.
                </Typography>
              );
            },
            [
              'start',
              'expiry'
            ],
          ]
        }, {
          title : 'Confirm',
          subtitle : 'Confirm',
          hideCloseButton : true,
          minHeight: 350,
          readonly : true,
          layout : [
            ()=>{
              return (
                <Typography
                  key="request"
                  variant="h6"
                  color="textSecondary"
                  component="p">
                  You are requesting that
                </Typography>
              );
            },
            'emails',
            (data)=>{
              return <EdgeTypeSelection
                key="edgetypeselection"
                field={resourceInviteDefinition.fields['edgeTypes']}
                accessTypeProps={accessTypeProps}
                value={data.edgeTypes}
                readonly={true}
              />;
            },
            (value)=>{
              const {start, expiry} = value;
              return (
                <div key="confirm">
                  <Typography
                    key="name"
                    variant="h6"
                    color="textSecondary"
                    component="p">
                    the {definition.label}
                  </Typography>

                  <Typography
                    key="description"
                    variant="h5"
                    color="textPrimary"
                    component="p">
                    {value.resourceDescription}
                  </Typography>

                  {(start != null || expiry != null) && (
                    <Typography
                      key="dates"
                      variant="h6"
                      color="textSecondary"
                      component="p">
                      between {
                        start === null ? 'now' : moment(start).format('LL')
                      } and {
                        expiry === null ? 'forever' : moment(expiry).format('LL')
                      }
                    </Typography>
                  )}
                </div>
              );
            }
          ]
        }]}
      />
      { variant === 'iconbutton' &&
        <IconButton
          disabled={disabled}
          size={iconProps.size}
          onClick={handleClick}
          title={iconProps.title}
          icon={iconProps.icon}
          color={iconProps.color}/>
      }
      { variant === 'button' &&
        <Button
          color={iconProps.color}
          disabled={disabled}
          size={iconProps.size}
          variant="contained"
          onClick={handleClick}
          startIcon={
            iconProps.icon ?
              <Icon>{iconProps.icon}</Icon> :
              null
          }
        >
          {iconProps.title}
        </Button>
      }
      { variant === 'listitem' &&
        <ListItem
          className={clsx(styles.listItem)}
          aria-label={iconProps.title}
          disabled={disabled}
          onClick={handleClick}
          component="div"
        >
          <ListItemIcon>
            <Icon color={iconProps.color}>{iconProps.icon}</Icon>
          </ListItemIcon>
          <ListItemText
            primary={iconProps.title}
            secondary={iconProps.subtitle}
          />
        </ListItem>
      }
    </div>
  ) : null;
};

ResourceSharingButton.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  definition : PropTypes.object.isRequired,
  resource : PropTypes.object.isRequired,
  iconButtonProps : PropTypes.shape(IconButton.propTypes),
  isOwner : PropTypes.bool,
  disabled : PropTypes.bool,
  onClosed : PropTypes.func,
  additionalResources : PropTypes.arrayOf(PropTypes.shape({
    resourceType : PropTypes.string.isRequired,
    resourceDescription : PropTypes.string,
    resourceID : PropTypes.string.isRequired,
    edgeTypes : PropTypes.arrayOf(PropTypes.string)
  })),
  onSaved : PropTypes.func,
  variant : PropTypes.oneOf(['button', 'iconbutton', 'listitem']),
  accessTypeProps : PropTypes.object,
  label : PropTypes.string,
  open : PropTypes.bool
};

export default ResourceSharingButton;
