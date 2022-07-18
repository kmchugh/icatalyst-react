/**
 * Creates a Date Range constraint that ensures that
 * the start date is before the end date
 * @param  {[type]}  startFieldID                                 The id of the start field in the model
 * @param  {Boolean} [requireStart=false]                         True to state that a value is required for the start field
 * @param  {[type]}  endFieldID                                   The id of the end field in the model
 * @param  {[type]}  [requireEnd=false}]                          True to state that a value is required for the end field
 * @return {[type]}                                               A string containing an error, or null if there are no errors
 */
export const createDateRangeConstraint = ({
  startFieldID,
  requireStart = false,
  endFieldID,
  requireEnd = false
})=>{
  if (!startFieldID || !endFieldID) {
    throw new Error('startFieldID and endFieldID must be specified');
  }
  return (model, field, value, definition) => {
    let error = null;
    const {id, label = id} = field;
    const {
      [startFieldID] : startValue,
      [endFieldID] : endValue
    } = model;

    const startFieldLabel = definition.fields[startFieldID].label || startFieldID;
    const endFieldLabel = definition.fields[endFieldID].label || endFieldID;

    const isStartField = id === startFieldID;
    const isEndField = !isStartField;

    if (!value && isStartField && requireStart) {
      error = `${label} is required`;
    }

    if (!value && isEndField && requireEnd) {
      error = `${label} is required`;
    }

    if (value && isStartField && value >= endValue) {
      error = `${label} must be before ${endFieldLabel}`;
    }

    if (value && isEndField && value <= startValue) {
      error = `${label} must be after ${startFieldLabel}`;
    }
    return error;
  };
};
