import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {SingularityContext} from '@icatalyst/components/Singularity';
import Button from '@material-ui/core/Button';
import * as DialogActions from '../../../store/actions/dialog.actions';
import { useDispatch } from 'react-redux';
import DialogContentEntityView from '../../../components/Dialogs/Content/DialogContentEntityView';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2),
    },
    button : {
      backgroundColor : 'red',
      color: 'white'
    },
    deleteTitle : {
      color: 'red'
    },
    text : {
      display: 'block',
      marginTop: theme.spacing(2)
    },
    textField : {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  };
});

const DeleteUser = ({
  className
})=>{
  const styles = useStyles();
  const dispatch = useDispatch();
  const phraseText = 'delete me';

  const singularityContext = useContext(SingularityContext);

  const onDeleteClicked = ()=>{
    dispatch(DialogActions.openDialog({
      title : `Delete User - ${singularityContext.user.displayname}`,
      children : (
        <DialogContentEntityView
          definition={{
            name: 'delete_user_model',
            generateModel : ()=>({delete_phrase : ''}),
            validate : (data)=>{
              return (data.delete_phrase !== phraseText) ?
                {
                  'delete_phrase' : [`Text must be '${phraseText}'`]
                } : {};
            },
            fields  : {
              'delete_phrase' : {
                id : 'delete_phrase',
                label : `Type '${phraseText}' to confirm`,
                type : 'string',
              }
            },
            layout : [
              ()=>(
                <Typography
                  key="title"
                  variant="h3"
                  className={clsx(styles.deleteTitle)}
                >
                  This action is not recoverable
                </Typography>
              ),
              ()=>(
                <Typography
                  key="text1"
                  className={clsx(styles.text)}
                  variant="body1"
                >
                  Once you delete your user you will no longer have access
                  to the service.
                </Typography>
              ),
              ()=>(
                <Typography
                  key="text2"
                  className={clsx(styles.text)}
                  variant="body1"
                >
                Please enter the phrase &apos;{phraseText}&apos; below to confirm that you have already exported any data that
                you need and that you are aware that you will lose
                your current access to the system.
                </Typography>
              ),
              'delete_phrase'
            ]
          }}
          actions={[{
            title : 'delete',
            icon : 'delete',
            onClick : ()=>{
              singularityContext.deleteUser();
            },
            disabled : ({isValid, isModified})=>{
              return !isValid || !isModified;
            },
            className : clsx(styles.button)
          }]}
        />
      )
    }));
  };

  return (
    <div className={clsx(styles.root, className)}>
      <Button
        className={clsx(styles.button)}
        variant="contained"
        onClick={onDeleteClicked}>
        Delete User
      </Button>
    </div>
  );
};

DeleteUser.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
};

export default DeleteUser;
