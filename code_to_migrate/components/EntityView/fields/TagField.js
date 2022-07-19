import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';

import clsx from 'clsx';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from '../../../hooks/fuse';

// import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme)=>{
  return {
    root : {
      marginTop : theme.spacing(1),
      marginBottom : theme.spacing(2)
    }
  };
});


const TagField = ({
  className,
  style = {},
  readonly = false,
  onChange,
  value,
  errors,
  field
}) => {
  const styles = useStyles();

  const {
    id,
    required,
    label,
    // maxLength,
    autoFocus = false,
    description,
    delimiter = '|',
    getOptions = null,
    multiple = true,
    freeSolo = true
  } = field;

  const [selectedValues, setSelectedValues] = useState(multiple ? [] : '');
  const [options, setOptions] = useState([]);

  const tagOptions = getOptions && getOptions();
  const entityReducer = tagOptions ?
    useSelector(tagOptions.definition.getReducerRoot) :
    null;

  useEffect(()=>{
    if (multiple) {
      setSelectedValues(
        value ? value.split(delimiter) : []
      );
    } else {
      setSelectedValues(value ? value : '');
    }
  }, [value]);

  useDeepCompareEffect(()=>{
    if (tagOptions && tagOptions.extractOptions &&
      entityReducer.entities
    ) {
      setOptions(
        tagOptions.extractOptions(entityReducer.entities)
      );
    }
  }, [entityReducer]);

  const hasErrors = errors && errors.length > 0;

  const cleanTags = (tags)=>{
    if (multiple) {
      return tags.length > 0 ?
        tags.map(t=>t.toLowerCase().trim())
          .filter((v, i, a)=>a.indexOf(v)===i)
          .join(delimiter) :
        null;
    } else {
      const cleaned = tags ? tags.toLowerCase().trim() : null;
      return cleaned ? cleaned : null;
    }
  };

  return (
    <FormControl
      className={clsx(styles.root, className)}
      style={style}
      variant="outlined"
      fullWidth
      error={errors && errors.length > 0}
      required={required}
    >
      <Autocomplete
        id={id}
        name={id}
        value={selectedValues}
        disabled={readonly}
        autoHighlight={true}
        autoSelect={true}
        multiple={multiple}
        freeSolo={freeSolo}
        className={clsx(styles.select)}
        fullWidth={true}
        options={options || []}
        renderTags={(value, getTagProps)=>{
          return value.map((option, index) => (
            <Chip
              key={option}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ));
        }}
        onChange={(e, values)=>{
          setSelectedValues(values);
          onChange && onChange(null, {
            [field.id] : cleanTags(values)
          });
        }}
        renderInput={(params)=>{
          return (
            <TextField {...params}
              inputProps={{
                ...params.inputProps,
                value: params.inputProps.value
              }}
              error={hasErrors}
              label={label || 'test'}
              name={id}
              helperText={hasErrors ? errors[0] : description}
              required={required}
              autoFocus={autoFocus}
              variant="outlined" />
          );
        }}
      />
    </FormControl>
  );
};

TagField.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  style: PropTypes.object,
  readonly : PropTypes.bool,
  onChange : PropTypes.func,
  value : PropTypes.any,
  errors: PropTypes.array,
  field : PropTypes.object.isRequired,
};

export default React.memo(TagField);



export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'tags';
  },
  getComponent : ()=>{
    return TagField;
  }
};
