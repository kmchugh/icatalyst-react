import {isURL as validate} from '../../../utilities/validations';

/**
 * Validation function used for models.
 * Checks that the value is a valid url.
 *
 * If the value is empty or null then this will validate as true under the
 * assumption that it is not a required field.  If the field is required then
 * an additional validation would be executed to disallow nulls
 *
 * @param  {Boolean}  requireHTTPS true to require a https validation, false otherwise
 * @return {Function}   the validation function
 */
export const createURLConstraint = (requireHTTPS = true)=>{

  return (model, field, value) => {
    value = value || '';

    let error = (value && !validate(value)) ?
      `${field.label} must be a valid url`
      : null;

    if (value && requireHTTPS && !value.toLowerCase().startsWith('https:')) {
      error = `${field.label} must be a secured url (https)`;
    }

    return error;
  };
};
