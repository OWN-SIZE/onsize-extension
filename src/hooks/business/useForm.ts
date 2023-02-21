import React, { useState } from 'react';

import { TopOrBottom } from '../../states';
import { ValuesType } from '../../types/useForm';

interface FormProps {
  initialValues: ValuesType;
  onSubmit: (values: object) => void;
}

function useForm({ initialValues, onSubmit }: FormProps) {
  const [values, setValues] = useState<ValuesType>(initialValues);
  const [addedValues, setAddedValues] = useState<ValuesType>(initialValues);
  const [isAddRow, setIsAddRow] = useState<TopOrBottom | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name !== 'size') {
      setValues({ ...values, [name]: parseFloat(value).toFixed(1) });
    }
  };

  const handleChangeAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddedValues({ ...addedValues, [name]: value });
  };

  const handleBlurAdded = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name !== 'size') {
      setAddedValues({ ...addedValues, [name]: parseFloat(value).toFixed(1) });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isAddRow) {
      Object.values(addedValues).filter((value) => value.length === 0).length > 0
        ? alert('모두 입력해주세요')
        : Object.values(values).filter((value) => value.length === 0).length > 0
        ? alert('모두 입력해주세요')
        : // 완료시 처리할 코드
          onSubmit(values);
    } else {
      Object.values(values).filter((value) => value.length === 0).length > 0
        ? alert('모두 입력해주세요')
        : // 완료시 처리할 코드
          onSubmit(values);
    }
  };

  return {
    values,
    handleChange,
    handleBlur,
    addedValues,
    handleChangeAdded,
    handleBlurAdded,
    handleSubmit,
    isAddRow,
    setIsAddRow,
  };
}

export default useForm;
