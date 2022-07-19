
/**
 * Helper function to check if a value has been set.
 * This should primarily be used where a value is numeric
 * and can be zero or where a value is a string and the
 * string can be empty
 * @param  {any}  value    The value to compare
 * @return {Boolean}       true if not set, otherwise false
 */
const isNotSet = (value)=>{
  return value === undefined || value === null;
};

/**
 * Creates a value length constraint that can be used with
 * models.
 * Checks that the value is between min and max characters in length.
 * If min is not provided, checks that the value is no more than max.
 * If max is not provided, checks that the value is greater than or equal to min.
 * @param  {[type]} min               [description]
 * @param  {[type]} max               [description]
 * @return {[type]}     [description]
 */
export const createLengthConstraint = (min, max) => {
  return (model, field, value)=>{
    // If no value is provided then pass
    if (isNotSet(value)) {
      return null;
    }

    const {label} = field;

    if (!isNotSet(min) && !isNotSet(max)) {
      // Between constraint
      if (value.length < min || value.length > max) {
        return `${label} should be ${min} to ${max} characters. [${value.length}]`;
      }
    } else if (!isNotSet(min)) {
      if (value.length < min) {
        return `${label} should be at least ${min} characters. [${value.length}]`;
      }
      // Min constraint
    } else if (!isNotSet(max)) {
      // Max constraint
      if (value.length > max) {
        return `${label} should be at most ${max} characters. [${value.length}]`;
      }
    }
    // Got here so pass
    return null;
  };
};
