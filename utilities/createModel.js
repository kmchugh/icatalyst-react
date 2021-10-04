import pluralize from 'pluralize';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ModelService from '../services/ModelService';

export const ModelPropTypes = PropTypes.shape({
  // the list of field definitions in order preference
  // TODO: SHAPE OF
  fields: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
});


// The entity definition is used to define data entities and the rules
// around those entities.
// The entity is an object that can contain the following properties:
// - fields [required] : the list of field definitions in order preference
// - children [optional]: the list of child entities in a parent child relationship.  In the format:
//                        {definition: childDefinition}
// - validate [optional]: a function for validating this entity, if defined then will
//                        override the validation system
// - getReducerRoot [required]: a function that helps to find the reducer state in the application state
// - name [required]: the name of this model
// - resourceName [optional]: the name of the resource in Singularity, defaults to the model name
// - component [optional]: the component to use when displaying the base route
// - createEntityPath [optional] : if specified when creating a new entity the user will be navigated to this path
// - detailComponent [optional]: the component to use when displaying the detail route
// - label [optional]: How to display the name
// - labelPlural [optional]: The plural of the model label
// - icon [required]: The mui icon to use when representing the model
// - auth [optional]: The role that can access this entity, defaults to everyone
// - readonly [optional]: If true then displayed in read only mode
// - addInline [optional]: If true then a dialog will be used when a user creates a new entity
// - identityFieldName [optional] : the field in the entity that should be used as the identity field, defaults to guid
// - getIdentity [optional] : function (item)->{item.guid}, defaults to returning the field as specified by identityFieldName
// - primaryTextField [optional] : the field to represent the primary text for the entity, defaults to 'name'
// - secondaryTextField [optional] : the field to represent the primary text for the entity, defaults to 'description'
// - featureImageField [optional] : the field to represent the feature image if needed for this entity
// - getPrimaryText [optional] : function (item)->{item.name}, defaults to returning the field as specified by primaryTextField
// - getSecondaryText [optional] : function (item)->{item.description}, defaults to returning the field as specified by secondaryTextField
// - getFeatureImage [optional] : function (item)->{item.image}, defaults to returning the field as specified by featureImageField or null if featureImageField is not defined
// - layout [optional] : array of arrays indicating how fields should be layed out,
//      arrays can contain field names or functions (entity, containerProps)=>component.  Defaults to fieldOrder
// - listLayout [optional] : flat list of what fields should be shown in a list, defaults to fieldOrder
// - transformPayload [optional] : function that receives the action and transforms it appropriately before being processed by the reducer.  defaults to (action)=>{action}
// - filterPayload [optional] : function that receives the array of data received and filters to appropriate fields.  Happens before transformation
// - getRetrieveAllParams [optional] : a function to add parameter when retrieving all records
// - getAddParams [optional] : a function to add parameters when adding a record
// - onEntityClicked [optional] : function to respond to an entity being clicked in a view such as a master view

// A field definition represents a property of the entity.
// A field may contain:
// - id [required]: the name of the property in the entity object this field represents
// - type [optional]: defaults to string, if defined indicates the type of field and hints
//                    at how it should be displayed
// - format [optional]: (v)->text, a function to return the text that should be displayed for this value
// - label [optional]: how the field should be referenced when it is visually displayed.
//                     for example the text displayed in the header of a column in a table
//                     representing this field
// - validate [optional]: a function for custom validation of this field, if defined then
//                        will override the validation system for this field
// - validations [optional]: a list of custom validation functions to run this field through when
//                          attempting to validate.  Each function should be in the following format
//                          (model, field, value)->{return error};
//                          model is the full entity being validated
//                          field is the field definition for the field specifically being validated
//                          value is the value of the field being validated
//                          the return value should be null if valid, or an error message if invalid
// - maxLength [optional]: if defined will add a validation rule to ensure the value is not more than
//                         the length provided
// - minLength [optional]: if defined will add a validation rule to ensure the value is not less than
//                         the length provided
// - required [optional]: if true will add a validation rule to ensure the value is present
// - default [optional]: a function that returns the default value of this field when a new entity is created
// - sortable [optional]: if this field is a sortable field, defaults to true
// - className [optional]: classes applied to both the header and body for this column

/**
 * updateValidations - Adds any validation functions required based
 * on the field properties
 *
 * @param {type} field the field to update the definitions for
 *
 * @returns {type} the list of validation functions for this field
 */
function normaliseValidations(field) {
  const validations = [
    ...(field.validations || [])
  ];

  // Ensure the field will adhere to minlength
  if (field.minLength) {
    validations.unshift((model, field, value)=>{
      const {label, minLength} = field;
      return (value && value.length < minLength) ?
        label + ' should be at least ' + minLength + ' characters':
        null;
    });
  }

  // Ensure the field will adhere to maxlength
  if (field.maxLength) {
    validations.unshift((model, field, value)=>{
      const {label, maxLength} = field;
      return (value && value.length > maxLength) ?
        label + ' should be at most ' + maxLength + ' characters':
        null;
    });
  }

  // Ensure required fields validate correctly
  if (field.required) {
    validations.unshift((model, field, value)=>{
      const {label} = field;
      return (!value || value.trim() === '') ?
        label + ' is required':
        null;
    });
  }
  return validations;
}

/**
 * createModel - Ensures the definition is in a standardised format
 *
 * @param {type} definition The model to use to create the definition
 *
 * @returns {type} the normalised definition
 */
export function createModel(model){
  // Allow modification of the model before generating the definition
  model = ModelService.mapModel(model);
  const definition = {
    identityFieldName : 'guid',
    primaryTextField : 'name',
    secondaryTextField : 'description',
    featureImageField : null,
    fields : [],
    fieldOrder : (model.fields || []).map((field)=>field.id),
    children : [],
    // Layout Settings can be overridden here
    settings: null,
    getIdentity : ((entity)=>{
      return entity[definition.identityFieldName];
    }),
    getPrimaryText : ((entity)=>{
      return entity[definition.primaryTextField];
    }),
    getSecondaryText : ((entity)=>{
      return entity[definition.secondaryTextField];
    }),
    getFeatureImage : ((entity)=>{
      return definition.featureImageField && entity[definition.featureImageField];
    }),
    getReducerRoot: ()=>{
      console.warn(`getReducerRoot function not set for definition ${model.id}`);
    },
    generateModel: (overrides)=>{
      const identityField = definition.identityFieldName;
      return Object.keys(definition.fields)
        .filter(f=>f!==identityField)
        .reduce((acc, fieldName)=>{
          const field = definition.fields[fieldName];
          // If there is a default, check if it is a function
          acc[field.id] = field.default ?
            ((typeof field.default === 'function') ?
              field.default(overrides) :
              field.default) :
            // There was not default value, so use the overrides or null
            ((overrides && overrides[fieldName]) || null);
          return acc;
        }, {});
    },
    validate: (entity, field, errors={})=>{
      field = field ? (Array.isArray(field) ? field : [field]) : field;
      return Object.keys(definition.fields)
        .filter((key)=>{return !field || field.includes(key);})
        .reduce((acc, fieldName)=>{
          const fieldDef = definition.fields[fieldName];
          acc[fieldName] = fieldDef.validations.map((validate)=>{
            return validate(entity, fieldDef, entity[fieldDef.id]);
          }).filter(error=>error);
          return acc;
        }, errors);
    },
    transformPayload : undefined,
    filterPayload : undefined,
    ...model
  };

  const fieldMap = (model.fields || []).reduce((acc, field)=>{
    acc[field.id] = {
      ...field,
      type : field.type || 'string',
      label : field.label || _.startCase(field.id),
      validations : normaliseValidations(field),
      sortable : field.sortable === undefined || field.sortable
    };
    return acc;
  }, {});
  definition.fields = fieldMap;


  definition.label = model.label || _.startCase(definition.name);
  definition.labelPlural = model.labelPlural || pluralize(definition.label);
  definition.namePlural = model.namePlural || pluralize(definition.name);

  definition.layout = model.layout ||
    definition.fieldOrder
      .filter((f)=>(definition.fields[f].display === undefined || definition.fields[f].display === true));
  definition.listLayout = model.listLayout ||
    definition.fieldOrder
      .filter((f)=>(definition.fields[f].display === undefined || definition.fields[f].display === true));

  if (model.auth) {
    if (typeof model.auth === 'string') {
      definition.auth = ()=>({
        create : [model.auth],
        retrieve : [model.auth],
        retrieveAll : [model.auth],
        update : [model.auth],
        delete : [model.auth],
        route : [model.auth]
      });
    } else if (Array.isArray(model.auth)) {
      definition.auth = ()=>({
        create : model.auth,
        retrieve : model.auth,
        retrieveAll : model.auth,
        update : model.auth,
        delete : model.auth,
        route : model.auth,
      });
    }  else if (typeof model.auth === 'function') {
      // By providing a function as an auth, it means that authorisation is not yet determinable
      definition.auth = (...params)=>model.auth(...params);
    } else {
      definition.auth = ()=>({
        create : model.auth && model.auth.create ? model.auth.create : model.auth,
        retrieve : model.auth && model.auth.retrieve ? model.auth.retrieve : model.auth,
        retrieveAll : model.auth && model.auth.retrieveAll ? model.auth.retrieveAll : model.auth,
        update : model.auth && model.auth.update ? model.auth.update : model.auth,
        delete : model.auth && model.auth.delete ? model.auth.delete : model.auth,
        route : model.auth && model.auth.route ? model.auth.route : model.auth,
      });
    }
  } else {
    definition.auth = null;
  }
  return definition;
}
