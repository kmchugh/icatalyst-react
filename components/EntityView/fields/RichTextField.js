import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import RichTextEditor from '../../RichTextEditor';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme)=>{
  return {
    root : {
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(2),
    },
    inputLabel : {
      backgroundColor : theme.palette.background.paper,
      paddingLeft: theme.spacing(.5),
      paddingRight: theme.spacing(.5)
    },
    inputControl : {
      display: 'block',
      padding: 0
    }
  };
});

const RichTextField = ({
  className,
  readonly = false,
  onChange,
  value,
  errors,
  field
})=>{
  const styles = useStyles();

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
    <TextField
      className={clsx(styles.root, className)}
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
