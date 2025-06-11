import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/styles';
import clsx from 'clsx';
import RichTextEditor from '../../RichTextEditor';
import TextField from '@mui/material/TextField';

const Root = styled(TextField)(({ theme }) => ({
  marginTop : theme.spacingNum(1),
  marginBottom : theme.spacingNum(2),
}));

const RichTextField = ({
  className,
  readonly = false,
  onChange,
  value,
  errors,
  field
})=>{
  const {
    id,
    required,
    label,
    maxLength,
    autoFocus = false,
    description,
    rteConfig = {}
  } = field;

  const hasErrors = errors && errors.length > 0;

  const multiline = rteConfig.multiline !== undefined ?
    rteConfig.multiline :
    maxLength>256;

  return (
    <Root
      className={clsx(className)}
      id={id}
      name={id}
      label={label}
      error={hasErrors}
      helperText={hasErrors ? errors[0] : description}
      required={required}
      autoFocus={autoFocus}
      InputProps={{
        readOnly: readonly,
        inputComponent : RichTextEditor,
        inputProps : {
          variant : 'inline',
          config : rteConfig,
          multiline : multiline
        }
      }}
      autoComplete="off"
      fullWidth
      variant="outlined"
      onChange={(e, value)=>{
        onChange && onChange(null, {
          [id] : value
        });
      }}
      inputProps={{
        maxLength : maxLength
      }}
      multiline={multiline}
      rows={multiline ? Math.min(maxLength/256, 20) : 1}
      value={value || ''}

    />
  );
};

RichTextField.propTypes={
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired
};

export default RichTextField;

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'richtext';
  },
  getComponent : ()=>{
    return RichTextField;
  }
};
