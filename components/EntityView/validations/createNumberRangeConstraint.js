
const isNotSet = (value)=>{
  return !value && value !== 0;
};

export const createNumberRangeConstraint = (min, max) => {
  return (model, field, value)=>{
    // If no value is provided then pass
    if (isNotSet(value)) {
      return null;
    }

    const {label} = field;

    if (!isNotSet(min) && !isNotSet(max)) {
      // Between constraint
      if (value < min || value > max) {
        return `${label} should be between ${min} and ${max}.`;
      }
    } else if (!isNotSet(min)) {
      if (value < min) {
        return `${label} should be at least ${min}.`;
      }
      // Min constraint
    } else if (!isNotSet(max)) {
      // Max constraint
      if (value > max) {
        return `${label} should be at most ${max}.`;
      }
    }
    // Got here so pass
    return null;
  };
};
