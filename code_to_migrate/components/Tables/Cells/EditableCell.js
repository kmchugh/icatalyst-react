import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const EditableCell = ({
  value: initialValue,
  row: {index},
  column: {id},
  updateData,
  className
})=>{
  const [value, setValue] = useState(initialValue);

  const onChange = (e)=>{
    setValue(e.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const onBlur = ()=>{
    updateData(index, id, value);
  };

  useEffect(()=>{
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

EditableCell.propTypes = {
  value : PropTypes.any.isRequired,
  row : PropTypes.shape({
    index : PropTypes.number.isRequired,
  }),
  column : PropTypes.shape({
    id : PropTypes.string.isRequired,
  }),
  updateData: PropTypes.func.isRequired,
  className : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default EditableCell;
