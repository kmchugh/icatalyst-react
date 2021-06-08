import React, {useState, useEffect, useContext} from 'react';
import {FormControl, InputLabel,
  CircularProgress, Select as NativeSelectField
} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {SingularityContext} from '@icatalyst/components/Singularity';

const useStyles = makeStyles((theme) => {
  return {
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

const LoadingIcon = ()=>{
  return <CircularProgress style={{
    marginRight: '.5em'
  }} size={16}/>;
};

const EntitySelectField = (props) => {

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const singularityContext = useContext(SingularityContext);
  const {accessToken} = singularityContext;

  const {
    readonly = false,
    onChange,
    value,
    errors,
    field
  } = props;

  const model = typeof field.model === 'function' ? field.model() : field.model;
  const {
    getReducerRoot = ()=>{},
    operations,
    label : entityName,
    identityFieldName,
    primaryTextField,
    getPrimaryText
  } = model;

  const data = useSelector(getReducerRoot);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (!data.loaded && !data.loading && (!data.entities || data.entities.length === 0)) {
      setLoading(true);
      dispatch(operations['RETRIEVE_ENTITIES'](()=>{
        setLoading(false);
      }, {
        accessToken: accessToken
      }));
    }
  }, [data]);

  const {
    id,
    required,
    label,
  } = field;

  const items = [
    {
      [identityFieldName]: '',
      [primaryTextField]: 'Select ' + entityName + '...'
    }, ...(data.entities || [])
  ];

  return (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      variant="outlined"
      fullWidth
      error={errors && errors.length > 0}
      required={required}
    >
      <InputLabel id={`${name}-label`} className={clsx(classes.inputLabel)}>
        {label}
      </InputLabel>

      {
        <NativeSelectField
          className={clsx(classes.select)}
          labelId={`${name}-label`}
          id={id}
          name={id}
          value={value || ''}
          onChange={onChange}
          required={required}
          inputProps={{
            readOnly: readonly,
            IconComponent: (loading && !data.loaded) ? LoadingIcon : ArrowDropDownIcon
          }}
        >
          {
            items.map((item) => <MenuItem key={item[identityFieldName]} value={item[identityFieldName]}>{getPrimaryText(item)}</MenuItem>)
          }
        </NativeSelectField>
      }
    </FormControl>
  );
};

EntitySelectField.propTypes = {
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

export default EntitySelectField;


export const fieldBuilder = {
  isCompatible : (fieldDefinition)=>{
    return fieldDefinition.type === 'entity';
  },
  getComponent : ()=>{
    return EntitySelectField;
  }
};
