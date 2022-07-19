import {isName as isValidName} from '../../../utilities/validations';

const NAME_FORMAT = /^[\p{L}|\p{N}]+.*[\p{L}|\p{N}]+$/u;
const NAME_REGEX = new RegExp(NAME_FORMAT);
const MIN_LENGTH = 4;

/**
 * Validation function used for models.
 * Checks that the value is a valid name and is at least 4 or more characters
 * @param  {Object}  model The full object being validated
 * @param  {Object}  field The description of the field being validated
 * @param  {Object}  value The value that is being validated
 * @return {String}       The validation error, or null if the value was okay
 */
export const isName = (model, field, value) => {
  let error = null;
  value = value || '';

  if (value.length >= MIN_LENGTH && !isValidName(value)) {
    // For a better user experience, give a specific error
    error = (NAME_REGEX.test(value)) ?
      `${field.label} can contain only letters, numbers, hyphens, underscores and spaces` :
      `${field.label} must start and end with letters or numbers`;
  } else if (value.length < MIN_LENGTH) {
    error = `${field.label} must be at least ${MIN_LENGTH} characters`;
  } else if (typeof value !== 'string') {
    error = `${field.label} must be a text value`;
  }
  return error;
};
