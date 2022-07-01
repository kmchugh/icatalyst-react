import React from 'react';
import {FormControl,
  InputLabel, FormHelperText} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    inputLabel : {
      backgroundColor : theme.palette.background.paper,
      paddingLeft: '.5em',
      paddingRight: '.5em'
    },
    customField : {
      paddingTop : theme.spacing(1.5),
      paddingBottom : theme.spacing(1),
    }
  };
});

const CustomField = (props) => {

  const classes = useStyles();

  const {readonly = false,
    onChange,
    value,
    errors, field} = props;

  const {
    id,
    required,
    label,
    description,
    Component
  } = field;

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      variant="outlined"
      fullWidth
      error={hasErrors}
      required={required}
    >
      <InputLabel
        shrink={true}
        id={`${id}-label`}
        className={clsx(classes.inputLabel)}
      >
        {label}
      </InputLabel>

      <Component
        className={clsx(classes.customField)}
        labelId={`${id}-label`}
        field={field}
        value={value || ''}
        onChange={(e)=>{
          if (e.target.value !== value) {
            onChange && onChange(e, value);
          }
        }}
        required={required}
        readonly={readonly}
      />

      <FormHelperText error={hasErrors}>
        {hasErrors ? errors[0] : description}
      </FormHelperText>

    </FormControl>
  );
};

CustomField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
};

export default React.memo(CustomField);

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'custom';
  },
  getComponent : ()=>{
    return CustomField;
  }
};
