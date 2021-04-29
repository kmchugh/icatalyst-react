import React, {useCallback} from 'react';
import {ModelPropTypes} from '../../utilities/createModel';
import {getComponent} from './fields';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root : {

  },
  col : {
    display: 'flex',
    flexDirection: 'column',

    '& > *' : {
      marginBottom: theme.spacing(1),
      flex: 1,

      '&:last-child' : {
        marginBottom: 0
      }
    }
  },
  row : {
    display: 'flex',
    flexDirection: 'row',

    '& > *' : {
      marginRight: theme.spacing(2),
      flex: 1,

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
  }
}));

const EntityView = ({
  definition,
  model,
  fieldProps,
  onChange,
  errors,
  className,
  readonly
}) => {
  const dispatch = useDispatch;
  const classes = useStyles();

  function renderField(field, index, layout, orientation){
    // If the field is an array then change the orientation
    // And render the contents
    if (Array.isArray(field)) {
      const wrapper = (
        <div key={orientation + '_' + index} className={clsx(classes[orientation], orientation)}>
          {field.map((field, i)=>{
            return renderField(field, i, layout, orientation === 'row' ? 'col' : 'row');
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

          let Component = getComponent(fieldDef);
          return <Component
            value={model[field]}
            field={fieldDef}
            key={fieldDef.id}
            readonly={readonly}
            onChange={onChange}
            errors={errors && errors[field]}
            //     className={clsx(classes.entityField)}
            //     readonly={readonly || fieldDef.readonly}
          />;
        };
      return renderFunction(model, fieldProps, dispatch);
    }
  }

  const layoutFn = useCallback(()=>{
    return definition.layout.map((field, index, layout)=>{
      console.log(layoutFn);
      return renderField(field, index, layout, 'row');
    });
  }, [definition]);

  return (
    <div className={clsx(classes.root, classes.col, 'col', className)}>
      {
        // layoutFn()
        definition.layout.map((field, index, layout)=>{
          return renderField(field, index, layout, 'row');
        })
      }
    </div>
  );
};

EntityView.displayName = 'EntityView';
EntityView.propTypes = {
  definition : ModelPropTypes.isRequired,
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
