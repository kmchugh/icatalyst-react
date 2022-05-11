import React, {useState, useEffect, useContext, useMemo} from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelectField from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Image from '../../Image';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '../../Icon';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {SingularityContext} from '@icatalyst/components/Singularity';
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
    avatar : {
      marginRight : theme.spacing(1),
    },
    searchInput: {
      padding: theme.spacing(1),
    },
    listItem : {
      overflow : 'hidden',
      ['& .MuiListItemText-secondary'] : {
        overflow: 'hidden',
        width: '100%',
        textOverflow : 'ellipsis'
      }
    }
  };
});

const DefaultListItem = ({
  item,
  getPrimaryText,
  hideSecondaryText,
  getSecondaryText,
  hideFeatureImage = false,
  getFeatureImage = null,
  className
})=>{
  const styles = useStyles();

  return (
    <ListItem className={className} component="div">
      { !hideFeatureImage && (
        <Avatar className={clsx(styles.avatar)}>
          <Image
            src={getFeatureImage(item)}
          />
        </Avatar>
      )}
      <ListItemText
        primary={getPrimaryText(item)}
        secondary={!hideSecondaryText && getSecondaryText(item)}
      />
    </ListItem>
  );
};

DefaultListItem.propTypes = {
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  item : PropTypes.object.isRequired,
  identityFieldName : PropTypes.string.isRequired,
  getPrimaryText : PropTypes.func.isRequired,
  hideSecondaryText : PropTypes.bool.isRequired,
  getSecondaryText : PropTypes.func.isRequired,
  hideFeatureImage : PropTypes.bool,
  getFeatureImage : PropTypes.func
};

const LoadingIcon = ()=>{
  return <CircularProgress style={{
    marginRight: '.5em'
  }} size={16}/>;
};

const EntitySelectField = (props) => {

  const classes = useStyles();
  const {t} = useContext(LocalizationContext);

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

  const {
    hideIfEmpty = false,
    description,
    autoFocus = false,
    icon = 'search'
  } = field;

  const model = typeof field.model === 'function' ? field.model() : field.model;
  const {
    getReducerRoot = ()=>{},
    operations,
    label : entityName,
    identityFieldName,
    primaryTextField,
    getPrimaryText,
    getSecondaryText,
    featureImageField,
    getFeatureImage
  } = model;

  const data = useSelector(getReducerRoot);
  const dispatch = useDispatch();

  const {
    id,
    required,
    label,
    hideSecondaryText = false,
    ListComponent = NativeSelectField,
    ListItemComponent = DefaultListItem,
    showLabel = true,
    addNoneItem = true,
    emptyItem,
    entities = null
  } = field;

  const [searchData, setSearchData] = useState('');
  const applyFilter = (label) =>{
    return label.toLowerCase().includes(searchData.trim().toLowerCase());
  };

  useEffect(()=>{
    if (entities) {
      // Nothing to do as we are using supplied entities
      return;
    }

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
          result.cancelToken.cancel('Unloading');
        }
      });
    }
  }, [data, entities]);

  const options = useMemo(()=>{
    const listItems = entities || data.entities;
    return [
      addNoneItem && {
        [identityFieldName]: '',
        [primaryTextField]: t('Select {0}...', t(entityName)),
        [featureImageField]: null
      },
      (!listItems || listItems.length === 0) && emptyItem,
      ...(listItems || [])
    ].filter(i=>i);
  }, [data, entities]);

  const hasErrors = errors && errors.length > 0;

  // Dont render if we haven't loaded any items and if hideIfEmpty is true;
  return (hideIfEmpty && (!options || options.length === 1)) ? null : (
    <FormControl
      className={clsx('mt-8 mb-16', props.className)}
      variant="outlined"
      fullWidth
      error={hasErrors}
      required={required}
    >
      {
        showLabel && <InputLabel shrink={!!value} id={`${name}-label`} className={clsx(classes.inputLabel)}>
          {label}
        </InputLabel>
      }

      <ListComponent
        className={clsx(classes.select)}
        MenuProps={{ autoFocus: autoFocus }}
        labelId={`${name}-label`}
        id={id}
        name={id}
        value={value || ''}
        onChange={(e)=>{
          if (e.target.value !== value) {
            onChange && onChange(e, e.target.value);
          }
        }}
        required={required}
        IconComponent={(loading && !data.loaded) ? LoadingIcon : ArrowDropDownIcon}
        inputProps={{
          readOnly: readonly,
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
                <Icon>{icon}</Icon>
              </InputAdornment>
            ),
            readOnly: readonly,
          }}
          onChange={(e) => setSearchData(e.target.value)}
          fullWidth
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />

        {
          options.filter((item) =>
            item[identityFieldName] && getPrimaryText(item) && applyFilter(getPrimaryText(item))
          ).map((item, index) => {
            const {id, value = id} = item;
            return (
              <MenuItem key={item[identityFieldName]} value={item[identityFieldName]}>
                <ListItemComponent
                  className={clsx(classes.listItem)}
                  dense
                  disableGutters
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
                  hideFeatureImage={
                    addNoneItem && index === 0 && !id ?
                      true :
                      !featureImageField
                  }
                  getFeatureImage={getFeatureImage}
                />
              </MenuItem>
            );
          })
        }
      </ListComponent>

      <FormHelperText error={hasErrors}>
        {hasErrors ? errors[0] : description}
      </FormHelperText>
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
