import React, { useState, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import NativeSelectField from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextField,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import _ from '../../../@lodash';
import {LocalizationContext} from '@icatalyst/localization/LocalizationProvider';
import { createMuiStyles, cxMui } from '../../../utilities';

const useStyles = createMuiStyles((theme) => {
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
      padding: theme.spacingNum(1),
    },
    listItem : {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
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
    description,
    hideMenuSearch,
  } = field;
  const [searchData, setSearchData] = useState('');
  const applyFilter = (label) =>{
    return label.toLowerCase().includes(searchData.trim().toLowerCase());
  };
  const showMenuSearch = hideMenuSearch !== true;

  const hasErrors = errors && errors.length > 0;

  return (
    <FormControl
      className={cxMui('mt-8 mb-16', props.className)}
      variant="outlined"
      fullWidth
      error={hasErrors}
      required={required}
    >
      <InputLabel id={`${id}-label`} className={cxMui(classes.inputLabel)}>
        {label}
      </InputLabel>

      <NativeSelectField
        className={cxMui(classes.select)}
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
        onClose={() => showMenuSearch && setSearchData('')}
        disabled={readonly}
      >
        {showMenuSearch && (
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
        )}
        {
          (showMenuSearch ?
            options.filter((item) =>
              applyFilter(item.label || item.id)
            ) :
            options
          ).map((item) => {
            const {id, value = id, label = _.startCase(id)} = item;
            return (
              <MenuItem key={id} value={value} className={classes.listItem}>
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
