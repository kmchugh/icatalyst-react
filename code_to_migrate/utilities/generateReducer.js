import _ from 'lodash';
import {createLengthConstraint} from '../components/EntityView/validations';

export const createInitialState = (definition, entities)=>{
  return {
    ...baseState,
    loaded : true,
    entities : [...entities],
    entity_map : entities.reduce((acc, entity)=>{
      acc[definition.getIdentity(entity)] = entity;
      return acc;
    }, {})
  };
};

/**
 * This is the initial state template for any data objects
 * @type {Object}
 */
const baseState = {
  // The data starts off as not having been loaded
  loaded : false,
  // The list of entities that are in memory.
  entities : [],
  // A mechanism to lookup entities by guid
  entity_map: {},
  // Errors that have accumulated on this model
  errors : [],
  // A list of child models that can be validated by this model
  children:[],
  // The validation function for this model
  // TODO: I believe this is no longer used, the definition validation is used instead.
  // Confirm and remove
  validate: ()=>{}
};


const parseErrors = (errors)=>{
  if (Array.isArray(errors)) {
    return errors;
  } else {
    console.error(errors);
    // TODO: complete
    return ['ERRORS'];
  }
};


const getReducerFn = (definition, type)=>{
  switch (type) {

  // Reset the reducer to the base state
  case 'ENTITY_INVALIDATE' :
    return (/*state, action*/)=>{
      return _.merge({}, baseState);
    };

  // Update the list of available entities
  case 'ENTITY_UPDATED_LIST' :
    return (state, action)=>{
      const payload = action.payload
        .filter(definition.filterPayload || (()=>true))
        .map(definition.transformPayload || ((i)=>i));
      return {
        ...state,
        errors: null,
        loaded: true,
        entities : [...payload],
        entity_map : payload.reduce(function(acc, item){
          acc[item[definition.identityFieldName]] = item;
          return acc;
        }, {})
      };
    };

  // Clear all loaded entities, update the errors
  case 'ENTITY_UPDATED_LIST_ERROR' :
    return (state, action)=>{
      return {
        ...state,
        errors: parseErrors(action.payload),
        loaded: true,
        entities: [],
        entity_map : {}
      };
    };

  // Load a specific entity and update the entity_map
  case 'ENTITY_LOADED' :
    return (state, action)=>{
      let index = state.entities.findIndex((entity)=>{
        return entity[definition.identityFieldName] === action.payload[definition.identityFieldName];
      });

      return {
        ...state,
        errors: null,
        entities: index === -1 ? [
          ...state.entities
        ] : [
          ...state.entities.slice(0, index),
          action.payload,
          ...state.entities.slice(index + 1)
        ],
        entity_map : {
          ...state.entity_map,
          [action.payload[definition.identityFieldName]] : action.payload
        }
      };
    };

  case 'ENTITY_ADDED' :
    return (state, action)=>{
      // Transform the payload as required
      const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
      const transformedPayload = payload.map(p=>{
        return (definition.transformPayload || ((i)=>i))(p);
      });
      const entityMap = transformedPayload.reduce((acc, p)=>{
        acc[p[definition.identityFieldName]] = p;
        return acc;
      }, {});
      return {
        ...state,
        errors : null,
        entities : [
          ...state.entities,
          ...transformedPayload
        ],
        entity_map : {
          ...state.entity_map,
          ...entityMap
        }
      };
    };

  case 'ENTITY_ADDED_ERROR' :
    return (state, action)=>{
      return {
        ...state,
        errors: action.payload,
      };
    };

  case 'ENTITY_DELETED' :
    return (state, action)=>{
      let index = state.entities.findIndex((element)=>{
        return element[definition.identityFieldName] === action.payload[definition.identityFieldName];
      });

      let map = {...state.entity_map};
      if (state.entity_map[action.payload[definition.identityFieldName]]) {
        delete map[action.payload[definition.identityFieldName]];
      }

      return {
        ...state,
        errors: null,
        entities: index === -1 ? [
          ...state.entities
        ] : [
          ...state.entities.slice(0, index),
          ...state.entities.slice(index + 1)
        ],
        entity_map : map
      };
    };

  case 'ENTITY_DELETED_ERROR' :
    return (state, action)=>{
      return {
        ...state,
        errors: action.payload,
      };
    };

  case 'ENTITY_UPDATED' :
    return (state, action)=>{
      let index = state.entities.findIndex((element)=>{
        return element[definition.identityFieldName] === action.payload[definition.identityFieldName];
      });

      const transformedPayload = (definition.transformPayload || ((i)=>i))(action.payload);

      return {
        ...state,
        errors: null,
        entities: index === -1 ? [
          ...state.entities,
          transformedPayload,
        ] : [
          ...state.entities.slice(0, index),
          transformedPayload,
          ...state.entities.slice(index + 1)
        ],
        entity_map : {
          ...state.entity_map,
          [action.payload[definition.identityFieldName]] : transformedPayload
        }
      };
    };

  case 'ENTITY_UPDATED_ERROR' :
    return (state, action)=>{
      return {
        ...state,
        errors: action.payload,
      };
    };

  default:
    return null;
  }
};

/**
 * Generates the reducer for the definition and actions specified.
 *
 * If custom actions is defined then it should be a reducer function.
 * If anything is returned by the custom action function, it is assummed
 * the custom action function handled then action and will not be processed
 * by the standard actions
 *
 * @method generateReducer
 * @param  {Object}        definition        The definition of the type
 * @param  {Object}        Actions           This list of actions to handle
 *                                            in the reducer
 * @param  {Object}        [initialState={}] The initial state to supply
 * @param  {Function(state, action)}      customActions     Allows for configuration of non standard
 *                                           crud.
 *                                           CRUD actions
 * @return {Function}                        The reducer function
 */
export function generateReducer(definition, {actions},
  initialState={}, customActions) {

  if (!definition) {
    console.error('definition not set when generating reducer');
  }
  if (!actions) {
    console.error(`actions not generated correctly for model: ${definition.name}`);
  }

  // If any entities are set as the initial then assume loaded
  if (initialState.entities) {
    initialState.loaded = !!initialState.entities;
  }

  // Prepare the initial state for this reducer
  initialState = _.merge({}, baseState, initialState);

  // Set of the entity fields
  initialState.entity_fields = definition.fieldOrder.reduce((acc, field)=>{
    acc[field.id] = {
      ...field,
      type : field.type || 'string',
      validations : [

        // Add the minLength and maxLength Validations
        ...(((field.minLength !== null && field.maxLength !== undefined) ||
          (field.maxLength !== null && field.maxLength !== undefined)) ? [
            createLengthConstraint(field.minLength, field.maxLength)
          ] : []),


        // Add the required field
        ...(field.required === true ? [(model, field, value)=>{
          const {id, label = id} = field;
          return (!value || value.trim() === '') ?
            label + ' is required':
            null;
        }] : []),

        ...(field.validations || [])
      ]
    };
    return acc;
  }, {});

  // Create the closure for model generation
  initialState.generateModel = ()=>{
    const {entity_fields} = initialState;
    return Object.keys(entity_fields).reduce((acc, prop)=>{
      // If not the identity field name then prepare the defaults
      if (prop !== definition.identityFieldName) {
        // Set the default value for the model
        acc[prop] = (
          entity_fields[prop].default &&
          entity_fields[prop].default()) || null;
      }
      return acc;
    }, {});
  };

  // Translate the actions from general to specific
  const actionMap = Object.keys(actions).reduce((acc, key)=>{
    acc[actions[key]] = key;
    return acc;
  }, {});

  // Generate the reducer function
  return (state = initialState, action)=>{
    // Run the custom actions if they are defined
    const result = customActions && customActions(state, action);
    if (result) {
      // If the custom actions handled this action then do nothing
      // else
      return result;
    }

    // Process the standard CRUD actions
    const reducerFn = actionMap[action.type] && getReducerFn(definition, actionMap[action.type]);
    return reducerFn ? reducerFn(state, action) : state;
  };
}
