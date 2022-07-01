import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from './DialogContent';
import ErrorWrapper from '../../Errors/ErrorWrapper';
import FuseLoading from '../../fuse/FuseLoading';
import {List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme) => {
  return {
    root : {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    errorWrapper: {
      padding: 0,
      marginBottom: theme.spacing(1),
      flexShrink: 1,
      flexGrow: 0,
    },
    errorWrapperComponent: {
      padding: 0,
    },
    entityList : {
      flexShrink: 1,
      flex: 1,
      overflow: 'auto',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      borderWidth: 'thin',
      borderColor: theme.palette.divider,
      borderRadius: theme.shape.borderRadius,
      '&::-webkit-scrollbar-thumb' : {
        backgroundColor: `${mostReadable(
          tinycolor(theme.palette.background.paper),
          [
            theme.palette.secondary.light,
            theme.palette.secondary.dark,
          ], {}
        ).toHexString()}`,
      }
    }
  };
});

const DialogContentEntityView = ({
  definition,
  actions,
  entityListClassName,
  entities,
  onSaved,
  message,
  confirmation,
  updatingTitle = 'Updating',
  ...rest
})=>{

  const classes = useStyles();

  const [dialogErrors, setDialogErrors] = useState(null);
  const [updating, setUpdating] = useState(false);

  const contentRef = useRef(null);

  return <DialogContent
    ref={contentRef}
    {...rest}
    updating={updating}
    // TODO: This needs to be updated to allow access to setUpdating and other calls on custom actions
    actions={actions || [{
      title : 'Delete',
      icon : 'delete',
      onClick : ()=>{
        setUpdating(true);
        onSaved(entities, (err)=>{
          if (err) {
            setDialogErrors(
              Array.isArray(err) ? err : (
                err.errors ? err.errors : [err]
              )
            );
          } else {
            contentRef.current.closeDialog();
          }
          setUpdating(false);
        });
      }
    }]}
  >
    <>
      <div className={clsx(classes.errorWrapper)}>
        {
          (dialogErrors && dialogErrors.length > 0) && (
            <ErrorWrapper className={clsx(classes.errorWrapperComponent)} errors={dialogErrors}/>
          )
        }
      </div>
      {updating && <FuseLoading title={updatingTitle}/>}
      {!updating &&
        <>
          { message &&
            <Typography variant="h6">
              {message}
            </Typography>
          }

          <List className={clsx(classes.entityList, entityListClassName)}>
            {entities.map((item)=>{
              return (
                <ListItem key={definition.getIdentity(item)}>
                  <ListItemText
                    primary={definition.getPrimaryText(item) || definition.getIdentity(item)}
                    secondary={definition.getSecondaryText(item)}
                  />
                </ListItem>
              );
            })}
          </List>

          { confirmation &&
            <Typography variant="body1">Are you sure?</Typography>
          }
        </>
      }
    </>
  </DialogContent>;
};

DialogContentEntityView.propTypes = {
  ...DialogContent.propTypes,
  updatingTitle : PropTypes.string,
  definition : PropTypes.object,
  message : PropTypes.string,
  confirmation : PropTypes.string,
  entityListClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  entities : PropTypes.arrayOf(PropTypes.object)
};

export default DialogContentEntityView;
