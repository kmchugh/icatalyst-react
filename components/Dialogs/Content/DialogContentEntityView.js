import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import DialogContent from './DialogContent';
import EntityView from '../../EntityView';
import {useForm} from '../../../hooks/fuse';
import _ from '../../../@lodash';
import ErrorWrapper from '../../Errors/ErrorWrapper';
import FuseLoading from '../../fuse/FuseLoading';


const EntityViewStyle = styled(EntityView)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ErrorWrapperStyle = styled(ErrorWrapper)(() => ({
  padding: 0,
}));

const DialogContentEntityView = ({
  definition,
  actions,
  entityViewClassName,
  entity,
  onSaved,
  updatingTitle = 'Saving',
  onChange,
  text = 'Save',
  icon = 'save',
  ...rest
})=>{

  const { form, handleChange, resetForm } = useForm(entity || definition.generateModel());

  const [errors, setErrors] = useState({});
  const [dialogErrors, setDialogErrors] = useState(null);
  const [updating, setUpdating] = useState(false);

  const contentRef = useRef(null);
  const modified = !entity || !(_.isEqual(entity, form));

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
    actions={actions ? (
      actions.map((action)=>{
        return {
          ...action,
          disabled : typeof action.disabled === 'function' ?
            ()=>{
              return action.disabled({
                isValid : isValid,
                isModified : modified,
                data : form
              });
            } :
            action.disabled
        };
      })
    ) : [{
      title : text,
      icon : icon,
      disabled : !isValid || !modified,
      onClick : ()=>{
        setUpdating(true);
        setDialogErrors(null);
        onSaved(form, (err)=>{
          setUpdating(false);
          if (err) {
            const definitionLayout = typeof(definition.layout) !== 'function' ?
              definition.layout : definition.layout(definition, form);
            const layout = definitionLayout.flat().map((field)=>{
              return typeof field === 'string' ? field : field.id;
            });
            // Parse out definition errors from generic errors
            const resultErrors = err.reduce((acc, error)=>{
              const field = error.key;
              if (field && layout.includes(field)) {
                acc.definition[field] = [
                  ...(acc.definition[field] || []),
                  error.message
                ];
              } else if (field) {
                acc.generic.push(`${error.message} (${field})`);
              } else {
                acc.generic.push(error);
              }
              return acc;
            }, {
              definition : {},
              generic : []
            });

            if (Object.keys(resultErrors.definition).length > 0) {
              setErrors((errors)=>({
                ...errors,
                ...resultErrors.definition
              }));
            }

            if (resultErrors.generic.length > 0) {
              setDialogErrors(resultErrors.generic);
            }
          } else {
            resetForm();
            contentRef.current.closeDialog();
          }
        });
      }
    }]}
  >
    <>
      <div className="mb-8">
        {
          (dialogErrors && dialogErrors.length > 0) && (
            <ErrorWrapperStyle errors={dialogErrors}/>
          )
        }
      </div>
      {updating && <FuseLoading title={updatingTitle}/>}
      {!updating &&
        <EntityViewStyle
          className={clsx(entityViewClassName, 'min-w-sm md:min-width-md')}
          definition={definition}
          hideReadOnly={true}
          model={form}
          errors={errors}
          onChange={(e, value)=>{
            const interceptChange = (onChange && onChange(
              e, value, form
            )) || null;
            handleChange(interceptChange ? null : e,
              interceptChange || value
            );
          }}
        />
      }
    </>
  </DialogContent>;
};

DialogContentEntityView.propTypes = {
  ...DialogContent.propTypes,
  definition : PropTypes.object.isRequired,
  entityViewClassName : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  updatingTitle : PropTypes.string,
  entity : PropTypes.object,
  onChange : PropTypes.func,
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default DialogContentEntityView;
