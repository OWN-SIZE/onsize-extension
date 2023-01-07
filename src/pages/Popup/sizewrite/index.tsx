import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import FormHeader from '../../../components/sizewrite/FormHeader';
import RadioButton from '../../../components/sizewrite/RadioButton';

function SizeWrite() {
  const [measure, setMeasure] = useState('단면');

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
        </Styled.FormContainer>
      </Styled.Root>
      <Button content="저장" />
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
    margin-top: 0.9rem;
  `,
  FormContainer: styled.div`
    display: flex;
    margin-top: 2.6rem;
    margin-bottom: 2.5rem;
  `,
};
