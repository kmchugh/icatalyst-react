import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {SingularityContext} from '../../Singularity';
import FuseLoading from '../../fuse/FuseLoading';
import {ListItemText} from '@material-ui/core';
import ErrorWrapper from '../../Errors/ErrorWrapper';

const useStyles = makeStyles(()=>{
  return {
    root : {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }
  };
});

const EntityCell = ({
  value, column, className
})=>{
  const classes = useStyles();
  const {field} = column;
  const {
    model : definition,
    hideSecondaryText = false
  } = field;

  const dispatch = useDispatch();

  const singularityContext = useContext(SingularityContext);
  const {isInRole, accessToken} = singularityContext;

  const { title, operations, getReducerRoot = ()=>{
    console.warn(`You have not set a selector root for definition ${title}`);
  } } = definition;

  const reducer = useSelector(getReducerRoot);
  const [data, setData] = useState(null);
  const [auth, setAuth] = useState(null);
  const [errors, setErrors] = useState();
  const [updating, setUpdating] = useState(false);

  const loadEntities = ()=>{
    if (reducer && definition && operations && operations['RETRIEVE_ENTITIES']) {
      if (!auth.retrieveAll) {
        setErrors(['You do not have access to this operation']);
        return;
      }
      setUpdating(true);
      const result = dispatch(operations['RETRIEVE_ENTITIES']((err)=>{
        // Success will be picked up by the reducer change
        if (err) {
          setErrors(err.errors || err);
        }
        setUpdating(false);
      }, {
        accessToken : accessToken,
        params : {
          // Implement params if required
        }
      }));

      return (()=>{
        result.cancelToken.cancel('Unloading');
      });
    }
  };

  useEffect(()=>{
    Promise.resolve(
      definition.auth && definition.auth(
        singularityContext,
      )
    ).then((retrievedAuth)=>{
      if (retrievedAuth) {
        setAuth(Object.keys(retrievedAuth).reduce((acc, key)=>{
          acc[key] = typeof retrievedAuth[key] === 'boolean' ?
            retrievedAuth[key] :
            isInRole(retrievedAuth[key]);
          return acc;
        }, {}));
      } else {
        setAuth(null);
      }
    });
  }, []);

  useEffect(()=>{
    if (auth && reducer && !reducer.loaded) {
      loadEntities();
      setData(null);
    } else if (reducer && reducer.loaded) {
      setData(reducer.entity_map);
      setUpdating(false);
    }
  }, [reducer, auth]);

  const entity = data && data[value];
  return (
    <div className={clsx(classes.root, className)}>
      {
        updating && <FuseLoading title={null}/>
      }

      {
        (!updating && entity) && (
          <ListItemText classes={{
            primary : classes.primary
          }}
          primary={definition.getPrimaryText(entity)}
          secondary={!hideSecondaryText && definition.getSecondaryText(entity)}
          />
        )
      }

      {
        (errors && errors.length > 0) && <ErrorWrapper errors={errors} title={`The following errors occurred when trying to retrieve ${definition.labelPlural}`}/>
      }
    </div>
  );
};

EntityCell.propTypes = {
  value : PropTypes.any.isRequired,
  row : PropTypes.shape({
    index : PropTypes.number.isRequired,
  }),
  column : PropTypes.shape({
    id : PropTypes.string.isRequired,
    field : PropTypes.object.isRequired
  }),
  updateData: PropTypes.func.isRequired,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default EntityCell;
