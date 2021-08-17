import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Typography, Divider, Button} from '@material-ui/core';
import { EntityView, IconButton, Icon } from '../../../../components';
import {FuseLoading} from '../../../../components/fuse';
import {SingularityContext} from '@icatalyst/components';
import {useForm} from '@icatalyst/hooks/fuse';
import {useDispatch} from 'react-redux';
import { Alert } from '@material-ui/lab';
import {useSelector} from 'react-redux';
import moment from '../../../../@moment';
import {definition as inviteDefinition} from '../../../../components/Singularity/store/reducers/invites.reducer';
import {definition as edgeTypeDefinition} from '../../../../components/Singularity/store/reducers/edgeType.reducer';
import {fade} from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => {
  const fadedBackground = fade(theme.palette.error.light, .45);
  return {
    root : {
      background: theme.palette.background.default,
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      // Fix for safari
      minHeight: '600px'
    },
    errorView : {
      alignSelf : 'center',
      width: '100%',
      textAlign: 'center',
    },
    error_wrapper : {
      alignSelf : 'center',
      width: '100%',
      textAlign: 'center',
      display: 'flex',
      background: fadedBackground,
      borderRadius: theme.shape.borderRadius,
    },
    error_list : {
      flex: '1 0 0%',
    },
    entityView : {
      width: '100%',

    },
    invites : {
      borderColor: theme.palette.divider,
      borderWidth: 'thin',
      borderRadius: theme.shape.borderRadius,
      maxHeight: '100%',
      overflow: 'auto'
    },
    formWrapper : {
      width: '100%',
      flex: '1 1 0%',
      overflow: 'auto',
      minHeight: theme.spacing(8)
    },
    inviteWrapper : {
      display: 'flex',
      alignItems : 'center',
      justifyContent : 'space-between',
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),

      '& .title' : {
        paddingBottom: theme.spacing(1),
      },

      '& .booleanField' : {
        flex: '1 0 0%'
      },

      '& .dateField' : {
        flex: 2,
      },

      '& > *' : {
        marginRight : theme.spacing(2),
      },

      '& > *:last-child' : {
        marginRight : 0,
      },

      '&.odd' : {
        backgroundColor : theme.palette.background.paper

      }
    },
    actionWrapper : {
      display : 'flex',
      width: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      justifyContent : 'flex-end'

    },
    actionButton : {
      marginRight: theme.spacing(1),
      '&:last-child' : {
        marginRight: 0,
      }
    }
  };
});

const CreateInvitation = ()=>{
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const {state = {}} = location;
  const [updating, setUpdating] = useState(false);
  const singularityContext = useContext(SingularityContext);
  const [errors, setErrors] = useState(null);
  const [dialogErrors, setDialogErrors] = useState(null);
  const {accessToken} = singularityContext;
  const edgesReducer = useSelector(edgeTypeDefinition.getReducerRoot);

  useEffect(()=>{
    if (!edgesReducer.loaded) {
      dispatch(edgeTypeDefinition.operations['RETRIEVE_ENTITIES'](()=>{
      }, {
        accessToken : accessToken
      }));
    }
  }, [edgesReducer]);

  const {
    entity,
    title,
    emails,
    starts,
    expires,
    owner,
    member,
    backUrl,
    resourceType,
    entityID,
    entityName,
    redirectUri,
    // entityDescription,
  } = state;

  const [definition] = useState({
    name : 'customInvite',
    fields : {
      emails : {
        id : 'emails',
        type : 'emaillist',
        label : 'Emails',
        showChips : false,
      },
      starts : {
        id : 'starts',
        label: 'This will take effect on',
        type : 'datetime',
      },
      expires : {
        id : 'expires',
        label: 'This will expire on (leave blank for never)',
        type : 'datetime',
      },
      member : {
        id : 'member',
        label: 'The user is a member and can view',
        type : 'boolean',
      },
      owner : {
        id : 'owner',
        label: 'The user is an owner and can modify and edit',
        type : 'boolean',
      }
    },
    layout : [
      ()=>{
        return (
          <Typography variant="h4">Creating Invitations</Typography>
        );
      },
      ()=>{
        return (
          <Typography variant="h5">{title}</Typography>
        );
      },
      ['starts', 'expires'],
      ['member', 'owner'],
      ()=>{
        return (
          <>
            <Divider/>
            <Typography variant="h5">Invitees</Typography>
          </>
        );
      },
      ()=>{
        return (
          <Typography variant="body1">
          Type or paste email addresses separated by a comma or tab to add to the
          list of emails.  If entering a single address, press enter or tab after typing the address.
          </Typography>
        );
      },
      'emails'
    ]
  });


  const { form, handleChange } = useForm(entity && {
    emails : emails || [],
    starts : starts || new Date().getTime(),
    expires : expires,
    owner : owner !== undefined ? owner : false,
    member : member !== undefined ? member : true,
  });

  const clearErrors = ()=>{
    setDialogErrors(null);
  };

  const isValid = () => {
    return form &&
      form.emails &&
      form.emails.length >= 1 && (form.member || form.owner);
  };


  useEffect(()=>{
    if (form) {
      setErrors({});//definition.validate(form));
    }
  }, [form]);

  if (updating) {
    return <FuseLoading title="Updating..."/>;
  }

  console.log(form);

  return (
    <div className={clsx(classes.root)}>
      {!entity && (
        <div className={clsx(classes.errorView)}>
          <Typography variant='h2'>Could not create invite</Typography>
        </div>
      )}

      {
        !updating && (dialogErrors && dialogErrors.length > 0) &&
          (
            <div className={clsx(classes.error_wrapper)}>
              <div className={clsx(classes.error_list)}>
                {dialogErrors.map((error, i)=>{
                  return (<Alert severity="error" key={error + '_' + i}>{error.message || error}</Alert>);
                })}
              </div>
              <div>
                <IconButton
                  title="clear"
                  icon="close"
                  onClick={clearErrors}/>
              </div>
            </div>
          )
      }

      {entity && (
        <EntityView
          className={clsx(classes.entityView)}
          definition={definition}
          hideReadOnly={true}
          model={form}
          errors={errors}
          onChange={handleChange}
        />
      )}


      <div className={clsx(classes.formWrapper)}>
        {(form && (!form.emails || form.emails.length === 0)) && (
          <Typography color="error">Please enter email addresses</Typography>
        )}

        {(form && form.emails && form.emails.length > 0) && (
          <div className={clsx(classes.invites)}>
            {
              form.emails.map((email, i)=>{
                return (
                  <div className={clsx(classes.inviteWrapper, i%2===0 ? 'even' : 'odd')} key={email}>
                    <Typography className="title">
                      {email}
                    </Typography>
                    <IconButton
                      icon="delete"
                      color="primary"
                      title="remove"
                      onClick={()=>{
                        handleChange(null, {emails : emails.filter((e)=>e!==email)});
                      }}
                    />
                  </div>
                );
              })
            }
          </div>
        )}
      </div>

      {entity && (
        <div className={clsx(classes.actionWrapper)}>
          <Button
            className={clsx(classes.actionButton)}
            color={'primary'}
            startIcon={
              <Icon>email</Icon>
            }
            variant="contained"
            buttonSize="medium"
            disabled={!isValid()}
            onClick={()=>{
              setUpdating(true);
              clearErrors();
              const invites = form && form.emails && form.emails.map((email)=>({
                email : email,
                description : null,
                name: `${entityName}`,
                start: new Date().getTime(),
                expiry : moment().add(1, 'day').valueOf(),
                message : '',
                payload : {
                  start: form.starts,
                  expiry : form.expiry,
                  resourceType : resourceType,
                  resourceID : entityID,
                  redirectUri : redirectUri,
                  edgeTypes : [
                    (form.owner && (
                      edgesReducer.entities.find((e)=>e.name.toLowerCase() === 'owner') ||
                      {guid : null}
                    ).guid),
                    (form.member && (
                      edgesReducer.entities.find((e)=>e.name.toLowerCase() === 'member') ||
                      {guid : null}
                    ).guid),
                  ].filter(i=>i)
                }
              }));
              dispatch(inviteDefinition.operations['ADD_ENTITIES'](
                invites,
                (err)=>{
                  if (err) {
                    // Update Errors
                    setDialogErrors(err.errors);
                  } else {
                    // Redirect to invites page
                    history.push(location.pathname.substring(0, location.pathname.lastIndexOf('/')));
                  }
                  setUpdating(false);
                }, {
                  accessToken : accessToken
                }
              ));
            }}>
            Send
          </Button>
          <Button
            className={clsx(classes.actionButton)}
            color="secondary"
            startIcon={
              <Icon>close</Icon>
            }
            variant="contained"
            buttonSize="medium"
            onClick={()=>{
              history.push(backUrl);
            }}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};


CreateInvitation.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
};

export default CreateInvitation;
