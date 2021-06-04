import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from './DialogContent';
import EntityView from '../../EntityView';
import {useForm} from '../../../hooks/fuse';
import _ from '../../../@lodash';
import ErrorWrapper from '../../Errors/ErrorWrapper';
import FuseLoading from '../../fuse/FuseLoading';

const useStyles = makeStyles((theme) => {
  return {
    root : {

    },
    entityView: {
      marginBottom : theme.spacing(2),
    },
    errorWrapper: {
      padding: 0,
      marginBottom: theme.spacing(1)
    }
  };
});

const DialogContentEntityView = ({
  definition,
  actions,
  entityViewClassName,
  entity,
  onSaved,
  updatingTitle = 'Saving',
  ...rest
})=>{

  const classes = useStyles();
  const { form, handleChange, resetForm } = useForm(entity || definition.generateModel());

  const [errors, setErrors] = useState({});
  const [dialogErrors, setDialogErrors] = useState(null);
  const [updating, setUpdating] = useState(false);

  const contentRef = useRef(null);
  const modified = !entity || _.isEqual(entity, form);

  useEffect(()=>{
    if (form) {
      setErrors(definition.validate(form));
    }
  }, [form]);

  const isValid = Object.keys(errors).flatMap((key)=>{
    return errors[key];
  }).length === 0;

  return <DialogContent
    ref={contentRef}
    {...rest}
    updating={updating}
    actions={actions || [{
      title : 'Save',
      icon : 'save',
      disabled : !isValid || !modified,
      onClick : ()=>{
        setUpdating(true);
        onSaved(form, (err)=>{
          if (err) {
            setDialogErrors(err);
          } else {
            resetForm();
            contentRef.current.closeDialog();
          }
          setUpdating(false);
        });
      }
    }]}
  >
    <>
      {
        (dialogErrors && dialogErrors.length > 0) && (
          <ErrorWrapper className={clsx(classes.errorWrapper)} errors={dialogErrors}/>
        )
      }
      {updating && <FuseLoading title={updatingTitle}/>}
      {!updating &&
        <EntityView
          className={clsx(classes.entityView, entityViewClassName, 'min-w-sm md:min-width-md')}
          definition={definition}
          hideReadOnly={true}
          model={form}
          errors={errors}
          onChange={(e)=>{
            handleChange(e);
          }}
        />
      }
    </>
  </DialogContent>;
};

DialogContentEntityView.propTypes = {
  ...DialogContent.propTypes,
  definition : PropTypes.object,
  entityViewClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  updatingTitle : PropTypes.string,
  entity : PropTypes.object
};

export default DialogContentEntityView;
