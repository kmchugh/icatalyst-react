import React, { useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField,InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import _ from '../../../@lodash';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';

const useStyles = makeStyles((theme) => {
  return {
    inputLabel : {
      backgroundColor : theme.palette.background.paper,
      paddingLeft: '.5em',
      paddingRight: '.5em'
    },
    select : {
      textAlign : 'left'
    },
    searchInput: {
      padding: theme.spacing(1),
    }
  };
});

const SelectField = (props) => {

  const classes = useStyles();
  const {t} = useContext(LocalizationContext);

  const {readonly = false,
    onChange,
    value,
    errors, field} = props;

  const {
    id,
    required,
    label,
    options,
    description
  } = field;
  const [searchData, setSearchData] = useState('');
  const applyFilter = (label) =>{
    return label.toLowerCase().includes(searchData.trim().toLowerCase());
  };

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      variant="outlined"
      fullWidth
      error={hasErrors}
      required={required}
    >
      <InputLabel id={`${id}-label`} className={clsx(classes.inputLabel)}>
        {label}
      </InputLabel>

      <NativeSelectField
        className={clsx(classes.select)}
        MenuProps={{ autoFocus: false }}
        labelId={`${id}-label`}
        id={id}
        name={id}
        value={value || ''}
        onChange={(e)=>{
          if (e.target.value !== value) {
            onChange && onChange(e, e.target.value);
          }
        }}
        required={required}
        inputProps={{
          readOnly: readonly
        }}
        onClose={() => setSearchData('')}
      >
        <TextField
          autoFocus
          className={classes.searchInput}
          placeholder={`${t('Search')}...`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={(e) => setSearchData(e.target.value)}
          fullWidth
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />
        {
          options.filter((item) =>
            item.label && applyFilter(item.label)
          ).map((item) => {
            const {id, value = id, label = _.startCase(id)} = item;
            return (
              <MenuItem key={id} value={value}>
                {label}
              </MenuItem>
            );
          })
        }

      </NativeSelectField>

      <FormHelperText error={hasErrors}>
        {hasErrors ? errors[0] : description}
      </FormHelperText>

    </FormControl>
  );
};

SelectField.propTypes = {
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

export default React.memo(SelectField);

export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'select';
  },
  getComponent : ()=>{
    return SelectField;
  }
};
