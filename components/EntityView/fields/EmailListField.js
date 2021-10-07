import React, {useState, useEffect} from 'react';
import {
  Chip,
  TextField as NativeTextField
} from '@material-ui/core';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

// TODO : Move this to a service or utility
const EMAIL_PATTERN = /^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,}$)/i;
const EMAIL_MATCH_PATTERN = /(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})/g;
const isValidEmail = (value) => {
  return !!(EMAIL_PATTERN.test(value));
};

const useStyles = makeStyles((theme) => {
  return {
    root : {
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(2)
    },
    chipWrapper : {

    },
    chip : {
      marginRight : theme.spacing(1),
      marginBottom : theme.spacing(1)
    },


    inputLabel : {
      backgroundColor : theme.palette.background.paper,
      paddingLeft: '.5em',
      paddingRight: '.5em'
    },
    select : {
      textAlign : 'left'
    }
  };
});


const EmailListField = ({readonly = false,
  onChange,
  value,
  errors, field,
  className,
})=>{

  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');
  const [inputErrors, setInputErrors] = useState(errors);

  useEffect(()=>{
    setInputErrors(errors);
  }, [errors]);

  const {
    id,
    required,
    label,
    autoFocus = false,
    showChips = true,
    description
  } = field;

  const updateEmails = (emails) => {
    if (!emails) {
      onChange && onChange(null, {[field.id] : null});
    } else {
      onChange && onChange(null, {[field.id] : emails});
    }
  };

  const isValid = (email) => {
    let error = null;

    const retVal = isValidEmail(email);

    if (!retVal) {
      error = [`${email} is not a valid email address.`];
    }

    if (value.includes(email)) {
      error = [`${email} has already been added.`];
    }

    if (error) {
      setInputErrors((errors)=>([
        ...(errors || []),
        error
      ]));
    }
    return !error;
  };

  const handleDeleteEmail = (email)=>{
    updateEmails(value.filter((e)=>e!==email));
  };

  const handleChange = (e)=>{
    if (e.target.value !== inputValue) {
      setInputErrors([]);
      setInputValue(e.target.value.toLowerCase());
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    setInputErrors([]);
    const extractedEmails = pasted.match(EMAIL_MATCH_PATTERN);
    if (extractedEmails) {
      updateEmails([
        ...value,
        ...extractedEmails.filter((e)=>(!value.includes(e)))
      ]);
    }
  };

  const handleBlur = (e)=>{
    const email = e.target.value;
    if (email && email.trim().length > 0 && isValid(email)) {
      updateEmails([
        ...value,
        email
      ]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e)=>{
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      var email = e.target.value;
      if (email && isValid(email)) {
        const updatedValue = [...value, email];
        updateEmails(updatedValue);
        setInputValue('');
      }
    }
  };

  const hasErrors = inputErrors && inputErrors.length > 0;

  return (
    <div>
      <NativeTextField
        className={clsx(classes.root, className)}
        id={id}
        name={id}
        label={label}
        error={hasErrors}
        helperText={hasErrors ? inputErrors[0] : description}
        required={required}
        autoFocus={autoFocus}
        disabled={readonly}
        InputLabelProps={{
          readOnly: readonly
        }}
        autoComplete="off"
        fullWidth
        type='email'
        variant="outlined"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onPaste={handlePaste}
        onBlur={handleBlur}
        value={inputValue}
      />

      {
        showChips && <div className={clsx(classes.chipWrapper)}>
          {
            value.map((email)=>{
              return (
                <Chip
                  className={clsx(classes.chip)}
                  key={email}
                  label={email}
                  onDelete={()=>handleDeleteEmail(email)}
                />
              );
            })
          }
        </div>
      }
    </div>
  );
};

EmailListField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.array,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
};

export default EmailListField;

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'emaillist';
  },
  getComponent : ()=>{
    return EmailListField;
  }
};
