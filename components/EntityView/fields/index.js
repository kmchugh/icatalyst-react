import TextField, {fieldBuilder as textFieldBuilder} from './TextField';
import {fieldBuilder as booleanFieldBuilder} from './BooleanField';
import {fieldBuilder as colorFieldBuilder} from './ColorSelectField';
import {fieldBuilder as customFieldBuilder} from './CustomField';
import {fieldBuilder as dateFieldBuilder} from './DateField';
import {fieldBuilder as dateTimeFieldBuilder} from './DateTimeField';
import {fieldBuilder as emailListFieldBuilder} from './EmailListField';
import {fieldBuilder as entitySelectFieldBuilder} from './EntitySelectField';
import {fieldBuilder as richTextFieldBuilder} from './RichTextField';
import {fieldBuilder as paletteSelectFieldBuilder} from './PaletteSelectField';
import {fieldBuilder as selectFieldBuilder} from './SelectField';



const fieldMap = [
  textFieldBuilder,
  booleanFieldBuilder,
  colorFieldBuilder,
  paletteSelectFieldBuilder,
  selectFieldBuilder,
  dateTimeFieldBuilder,
  dateFieldBuilder,
  emailListFieldBuilder,
  entitySelectFieldBuilder,
  customFieldBuilder,
  richTextFieldBuilder,

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

export function registerFieldBuilder(builder){
  fieldMap.splice(fieldMap.length -2, 0, builder);
}
