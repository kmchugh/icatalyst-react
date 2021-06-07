import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Typography, Divider, Button} from '@material-ui/core';
import { EntityView, IconButton, Icon } from '@icatalyst/components';
import {useForm} from '@icatalyst/hooks/fuse';


const useStyles = makeStyles((theme) => {
  return {
    root : {
      background: theme.palette.secondary.main,
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    errorView : {
      alignSelf : 'center',
      width: '100%',
      textAlign: 'center',
    },
    entityView : {
      width: '100%',
    },
    invites : {
      flex: 1,
      borderColor: theme.palette.divider,
      borderWidth: 'thin',
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto'
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
        flex: 1,
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

  const {state = {}} = location;

  const {
    entity,
    title,
    emails,
    starts,
    expires,
    owner,
    member,
    backUrl,
    definitionType
  } = state;

  console.log(definitionType);

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
          list of emails
          </Typography>
        );
      },
      'emails',
      (entity)=>{
        const {emails} = entity;
        if (!emails || emails.length === 0) {
          return <Typography color="error">Please enter email addresses</Typography>;
        } else {
          return (
            <div className={clsx(classes.invites)}>
              {
                emails.map((email, i)=>{
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
          );
        }
      }
    ]
  });


  const { form, handleChange } = useForm(entity && {
    emails : emails || [],
    starts : starts || new Date().getTime(),
    expires : expires,
    owner : owner !== undefined ? owner : false,
    member : member !== undefined ? member : true,
  });
  const [errors, setErrors] = useState({});

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

  return (
    <div className={clsx(classes.root)}>
      {!entity && (
        <div className={clsx(classes.errorView)}>
          <Typography variant='h2'>Could not create invite</Typography>
        </div>
      )}

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
              console.log('sending');
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
