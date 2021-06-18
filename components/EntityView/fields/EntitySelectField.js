import React, {useState, useEffect, useContext} from 'react';
import {FormControl, InputLabel,
  CircularProgress, Select as NativeSelectField,
  FormHelperText, MenuItem, ListItemText
} from '@material-ui/core';
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

const DefaultListItem = ({
  item,
  getPrimaryText,
  hideSecondaryText,
  getSecondaryText,
})=>{
  return (
    <ListItemText
      primary={getPrimaryText(item)}
      secondary={!hideSecondaryText && getSecondaryText(item)}
    />
  );
};

DefaultListItem.propTypes = {
  item : PropTypes.object.isRequired,
  identityFieldName : PropTypes.string.isRequired,
  getPrimaryText : PropTypes.func.isRequired,
  hideSecondaryText : PropTypes.bool.isRequired,
  getSecondaryText : PropTypes.func.isRequired,
};

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

  const { hideIfEmpty = false } = field;

  const model = typeof field.model === 'function' ? field.model() : field.model;
  const {
    getReducerRoot = ()=>{},
    operations,
    label : entityName,
    identityFieldName,
    primaryTextField,
    getPrimaryText,
    getSecondaryText,
  } = model;

  const data = useSelector(getReducerRoot);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (!data.loaded && !data.loading && (!data.entities || data.entities.length === 0)) {
      setLoading(true);
      const result = dispatch(operations['RETRIEVE_ENTITIES'](()=>{
        setLoading(false);
      }, {
        accessToken: accessToken,
        params : {
          ...(model.getRetrieveAllParams ? model.getRetrieveAllParams(model, {
          }) : {})
        }
      }));

      return (()=>{
        if (result && result.cancelToken) {
          result.cancelToken.cancel();
        }
      });

    }
  }, [data]);

  const {
    id,
    required,
    label,
    hideSecondaryText = false,
    ListComponent = NativeSelectField,
    ListItemComponent = DefaultListItem,
    showLabel = true,
    addNoneItem = true,
    emptyItem
  } = field;

  const items = [
    addNoneItem && {
      [identityFieldName]: '',
      [primaryTextField]: 'Select ' + entityName + '...'
    },
    (!data.entities || data.entities.length === 0) && emptyItem,
    ...(data.entities || [])
  ].filter(i=>i);

  // Dont render if we havent' loaded any items and if hideIfEmpty is true;
  return (hideIfEmpty && (!items || items.length === 1)) ? null : (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      variant="outlined"
      fullWidth
      error={errors && errors.length > 0}
      required={required}
    >
      {
        showLabel && <InputLabel shrink={!!value} id={`${name}-label`} className={clsx(classes.inputLabel)}>
          {label}
        </InputLabel>
      }

      {
        <ListComponent
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
            items.map((item) => {
              return (
                <MenuItem key={item[identityFieldName]} value={item[identityFieldName]}>
                  <ListItemComponent
                    key={item[identityFieldName]}
                    item={item}
                    model={model}
                    field={field}
                    identityFieldName={identityFieldName}
                    getPrimaryText={getPrimaryText}
                    hideSecondaryText={hideSecondaryText}
                    getSecondaryText={getSecondaryText}
                    onChange={onChange}
                    selected={value}
                  />
                </MenuItem>
              );
            })
          }
        </ListComponent>
      }
      <FormHelperText>{errors && errors.join('/n')}</FormHelperText>
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
