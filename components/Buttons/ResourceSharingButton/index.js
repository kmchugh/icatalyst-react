import React, {useState, useContext, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import IconButton from '../../IconButton';
import _ from '../../../@lodash';
import { SingularityContext } from '@icatalyst/components';
import { Wizard } from '../../Wizard';
import Typography from '@material-ui/core/Typography';
import moment from '../../../@moment';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {definition as resourceInviteDefinition } from '../../Singularity/store/reducers/resourceInvite.reducer';

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
  };
});

const ResourceSharingButton = ({
  className,
  definition,
  resource,
  iconButtonProps = {},
  isOwner = null,
  disabled = false
})=>{
  const styles = useStyles();
  const iconButtonDefaults = {
    size : 'small',
    title : `Share ${definition.label.replace(/\b\w/g, c => c.toUpperCase())}`,
    icon : 'ios_share',
    color : 'primary',
  };
  const iconProps = _.merge({}, iconButtonDefaults, iconButtonProps);
  const [showWizard, setShowWizard] = useState(false);
  const [resourceOwner, setResourceOwner] = useState(isOwner);

  const authContext = useContext(SingularityContext);
  const {isResourceOwner} = authContext;
  const wizardRef = useRef(null);

  useEffect(()=>{
    if (resource && !resourceOwner) {
      isResourceOwner(
        definition.resourceName || definition.name,
        definition.getIdentity(resource)).then((isOwner)=>{
        setResourceOwner(isOwner);
      });
    }
  }, [resource, isOwner]);

  const handleClick = (e)=>{
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
        entity={{
          emails : [],
          resourceType : resourceType,
          resourceDescription : primaryText,
          resourceID : resourceID,
          start : null,
          expiry : null
        }}
        definition={resourceInviteDefinition}
        className={clsx(styles.wizard)}
        open={showWizard}
        title={`Sharing ${definition.label}`}
        onClosed={()=>{
          setShowWizard(false);
        }}
        onSave={(data, callback)=>{
          console.log('saving', data);
          callback && callback();
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
          layout : ['edgeTypes']
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
                  You have requested that
                </Typography>
              );
            },
            'emails',
            'edgeTypes',
            (value)=>{
              const {start, expiry} = value;
              return (
                <>
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
                    {value.resourcedescription}
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
                </>
              );
            }
          ]
        }]}
      />
      <IconButton
        disabled={disabled}
        size={iconProps.size}
        onClick={handleClick}
        title={iconProps.title}
        icon={iconProps.icon}
        color={iconProps.color}/>
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
  disabled : PropTypes.bool
};

export default ResourceSharingButton;
