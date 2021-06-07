import _ from '../../@lodash';
import { useCallback, useState } from 'react';

function useForm(initialState, onSubmit) {
  const [form, setForm] = useState(initialState);

  const handleChange = useCallback((event, valueMap) => {
    if (event) {
      event.persist && event.persist();

      let value = event.target.value;
      // Checkboxes and dates are handled differently
      if (event.target.type === 'checkbox') {
        value = event.target.checked;
      } else if (
        event.target.type === 'datetime-local' ||
        event.target.type === 'date'
      ) {
        value = value && value.length > 0 ?
          new Date(value).getTime() :
          null;
      }
      setForm(_form => {
        return _.setIn(
          { ..._form },
          event.target.name,
          value
        );
      });
    } else if (valueMap) {
      Object.keys(valueMap).forEach((key) => {
        console.log(key, valueMap[key]);
        setForm(_form => {
          return _.setIn(
            { ..._form },
            key,
            valueMap[key]
          );
        });
      });
    }
  }, []);

  const resetForm = useCallback(() => {
    if (!_.isEqual(initialState, form)) {
      setForm(initialState);
    }
  }, [form, initialState]);

  const setInForm = useCallback((name, value) => {
    setForm(_form => _.setIn(_form, name, value));
  }, []);

  const handleSubmit = useCallback(
    event => {
      if (event) {
        event.preventDefault();
      }
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return {
    form,
    handleChange,
    handleSubmit,
    resetForm,
    setForm,
    setInForm
  };
}

export default useForm;
