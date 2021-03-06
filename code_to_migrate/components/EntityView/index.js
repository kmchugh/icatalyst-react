import React from 'react';
import {ModelPropTypes} from '../../utilities/createModel';
import {getComponent} from './fields';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/styles';
import PropTypes from 'prop-types';
import {tinycolor, mostReadable} from '@ctrl/tinycolor';

const useStyles = makeStyles((theme) => ({
  root : {
    ['& .MuiFormLabel-root.Mui-focused:not([class*="Mui-error"])'] : {
      color: mostReadable(tinycolor(theme.palette.background.default), [
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
      ]).toHex8String()
    }
  },
  col : {
    display: 'flex',
    flexDirection: 'column',

    '& > *' : {
      marginBottom: theme.spacing(1),
      flex: '1 0 0%',

      '&:last-child' : {
        marginBottom: 0
      }
    },

    '& > .MuiDivider-root' : {
      maxHeight: 1,
      minHeight: 1,
    },
  },
  row : {
    display: 'flex',
    flexDirection: 'row',

    '& > *' : {
      marginRight: theme.spacing(2),
      flex: '1 0 0%',

      '&:last-child' : {
        marginRight: 0
      }
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',

      '& > *' : {
        marginRight: 0,
        marginBottom: theme.spacing(2),
      }
    }
  },
  entityField : {
  },
}));

const EntityView = ({
  definition,
  model,
  fieldProps,
  onChange,
  errors,
  className,
  readonly,
  hideReadOnly
}) => {
  const dispatch = useDispatch;
  const classes = useStyles();
  const theme = useTheme();

  if (!model) {
    console.error('A model has not been passed to the entity view, this is most likely an error');
  }

  function renderField(field, index, layout, orientation, key){
    // If the field is an array then change the orientation
    // And render the contents
    if (Array.isArray(field)) {
      key = !key ? `${orientation}_${index}` : `${key}|${orientation}_${index}`;
      const wrapper = (
        <div key={key} className={clsx(classes[orientation], orientation)}>
          {field.map((field, i)=>{
            return renderField(field, i, layout, orientation === 'row' ? 'col' : 'row', key);
          })}
        </div>
      );
      return wrapper;
    } else {
      // Otherwise render the field
      const renderFunction = typeof field === 'function' ? field :
        ()=>{
          if (!model) {
            return null;
          }
          const fieldDef = definition.fields[field];

          if (!fieldDef) {
            console.error(`A field definition for ${field} could not be found in ${definition.name}`);
          }

          let Component = getComponent(fieldDef);
          return (hideReadOnly && fieldDef.readonly) ? null : <Component
            value={fieldDef.getValue ? fieldDef.getValue(model) : model[field]}
            field={fieldDef}
            key={`${key}_${fieldDef.id}`}
            readonly={readonly || fieldDef.readonly}
            onChange={fieldDef.setValue ?
              (e, value)=>{
                // Custom data so don't pass the event
                onChange(null, fieldDef.setValue(model, value || e.target.value));
              } : onChange
            }
            errors={errors && errors[field]}
            className={clsx(classes.entityField)}
            style={{
              paddingLeft : theme.spacing(fieldDef.indent || 0)
            }}
          />;
        };
      return renderFunction(model, fieldProps, dispatch);
    }
  }

  const entityKey = `${definition.name}_entityView`;

  return (
    <div key={entityKey} className={clsx(classes.root, classes.col, 'col', className)}>
      {
        (definition.layout || []).map((field, index, layout)=>{
          return renderField(field, index, layout, 'row', entityKey);
        })
      }
    </div>
  );
};

EntityView.displayName = 'EntityView';
EntityView.propTypes = {
  definition : ModelPropTypes.isRequired,
  hideReadOnly : PropTypes.bool,
  model : PropTypes.object,
  fieldProps : PropTypes.object,
  onChange : PropTypes.func,
  errors : PropTypes.object,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  readonly : PropTypes.bool
};


export default React.memo(EntityView);
