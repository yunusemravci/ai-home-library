import { useState, useCallback } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((onSubmit) => (e) => {
    e.preventDefault();
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  }, [values, validate]);

  return { values, errors, handleChange, handleSubmit, setFieldValue, setValues };
};

export default useForm;