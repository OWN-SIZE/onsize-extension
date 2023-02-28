import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { TopOrBottom } from '../../states';
import { topOrBottomState } from '../../states/atom';
import { ValuesType } from '../../types/useForm';

interface FormProps {
  measure: '단면' | '둘레';
  initialValues: ValuesType;
  onSubmit: (values: object) => void;
}

function useForm(props: FormProps) {
  const topOrBottom = useRecoilValue(topOrBottomState);
  const { measure, initialValues, onSubmit } = props;
  const [values, setValues] = useState<ValuesType>(initialValues);
  const [addedValues, setAddedValues] = useState<ValuesType>(initialValues);
  const [isAddRow, setIsAddRow] = useState<TopOrBottom | null>(null);

  useEffect(() => {
    if (topOrBottom === 'top') {
      setValues({
        ...values,
        shoulder: measureConverter(values.shoulder),
        chest: measureConverter(values.chest),
      });
      setAddedValues({
        ...addedValues,
        shoulder: measureConverter(addedValues.shoulder),
        chest: measureConverter(addedValues.chest),
      });
    } else {
      setValues({
        ...values,
        waist: measureConverter(values.waist),
        thigh: measureConverter(values.thigh),
        hem: measureConverter(values.hem),
      });
      setAddedValues({
        ...addedValues,
        waist: measureConverter(addedValues.waist),
        thigh: measureConverter(addedValues.thigh),
        hem: measureConverter(addedValues.hem),
      });
    }
  }, [measure]);

  const measureConverter = (value: string) => {
    return `${measure === '둘레' ? (parseFloat(value) * 2).toFixed(1) : (parseFloat(value) / 2).toFixed(1)}`;
  };

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
