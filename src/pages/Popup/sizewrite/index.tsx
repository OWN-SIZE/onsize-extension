import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import AddRowButton from '../../../components/sizewrite/AddRowButton';
import FormHeader from '../../../components/sizewrite/FormHeader';
import FormRow from '../../../components/sizewrite/FormRow';
import RadioButton from '../../../components/sizewrite/RadioButton';
import useForm from '../../../hooks/business/useForm';

const TopInputList = [
  { inputKey: 'size', withcm: false },
  { inputKey: 'topLength', withcm: true },
  { inputKey: 'shoulder', withcm: true },
  { inputKey: 'chest', withcm: true },
];

function SizeWrite() {
  const [measure, setMeasure] = useState('단면');
  const [isAddRow, setIsAddRow] = useState(false);
  const { values, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues: { size: '', topLength: '', shoulder: '', chest: '' },
    onSubmit: (values) => console.log(values),
  });

  useEffect(() => {
    document.getElementById('app-container')?.style = css`
      width: 63.2rem;
      min-height: 31.4rem;
    `;
  }, []);

  return (
    <Layout title="지금 보고 있는 옷의 궁금한 사이즈를 입력해주세요" back close>
      <Styled.Root>
        <Styled.RadioButtonContainer>
          <RadioButton label="단면" isClicked={measure === '단면'} onClick={() => setMeasure('단면')} />
          <RadioButton label="둘레" isClicked={measure === '둘레'} onClick={() => setMeasure('둘레')} />
        </Styled.RadioButtonContainer>
        <Styled.FormContainer>
          <FormHeader formHeaderList={['사이즈', '총장', `어깨 ${measure}`, `가슴 ${measure}`]} />
          <FormRow
            inputList={TopInputList}
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          {isAddRow && (
            <FormRow
              inputList={TopInputList}
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSecond={isAddRow}
              onClickDelete={() => setIsAddRow(false)}
            />
          )}
        </Styled.FormContainer>
        <AddRowButton onClick={() => setIsAddRow(true)} isShow={!isAddRow} />
      </Styled.Root>
      <Button content="저장" onClick={handleSubmit} />
    </Layout>
  );
}

export default SizeWrite;

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  RadioButtonContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 1.4rem;
    margin-top: 2.3rem;
  `,
  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2.6rem;
  `,
};
