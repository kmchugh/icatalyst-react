const NAME = /^[\p{L}|\p{N}]+[\p{L}|\p{N}|\s|\-|_]*[\p{L}|\p{N}]+$/u;
const NAME_REGEX = new RegExp(NAME);
/**
 * Ensures that the value provided is a human readable string that:
 * - Is alpha numeric (includes unicode characters),
 * - Allows spaces, underscores, and hyphens
 * - Starts and ends with a letter or number
 * @param  {String}  text The text value to check
 * @return {boolean}      true if the passed value is valid
 */
export const isName = (text) => {
  return typeof text === 'string' &&
    NAME_REGEX.test(text);
};
