import React, { useEffect, useState } from 'react';

interface FormProps {
  initialValues: object;
  onSubmit: (values: object) => void;
}

function useForm({ initialValues, onSubmit }: FormProps) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name !== 'size') {
      setValues({ ...values, [name]: `${parseFloat(value).toFixed(1)}` });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    // 완료시 처리할 코드
    onSubmit(values);
  };

  return {
    values,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}

export default useForm;
