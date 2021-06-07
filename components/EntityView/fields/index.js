import TextField, {fieldBuilder as textFieldBuilder} from './TextField';
import {fieldBuilder as booleanFieldBuilder} from './BooleanField';
import {fieldBuilder as selectFieldBuilder} from './SelectField';
import {fieldBuilder as dateTimeFieldBuilder} from './DateTimeField';
import {fieldBuilder as emailListFieldBuilder} from './EmailListField';

const fieldMap = [
  textFieldBuilder,
  booleanFieldBuilder,
  selectFieldBuilder,
  dateTimeFieldBuilder,
  emailListFieldBuilder,

  // Default to TextField if no other matches
  {
    isCompatible : ()=>true,
    getComponent : ()=>TextField
  }
];


/**
 * Gets the first component that is compatible with the
 * field definition
 * @param  {Object} fieldDefinition the field definition to check
 * @return {Component}                 the component to render
 */
export function getComponent(fieldDefinition){
  return fieldMap
    .find((builder)=>builder.isCompatible(fieldDefinition))
    .getComponent();
}
