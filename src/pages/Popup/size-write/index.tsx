import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Layout from '../../../components/common/Layout';
import AddRowButton from '../../../components/sizewrite/AddRowButton';
import FormHeader from '../../../components/sizewrite/FormHeader';
import FormRow from '../../../components/sizewrite/FormRow';
import RadioButton from '../../../components/sizewrite/RadioButton';
import useForm from '../../../hooks/business/useForm';
import { useSizeCompare } from '../../../hooks/queries/useSizeCompare';
import { currentViewState, productSelfWriteState, topOrBottomState } from '../../../states/atom';
import theme from '../../../styles/theme';
import { SizeTableType } from '../../../types/remote';
import { BottomValuesType, TopValuesType } from '../../../types/useForm';

const TopInputList = [
  { inputKey: 'size', withcm: false },
  { inputKey: 'topLength', withcm: true },
  { inputKey: 'shoulder', withcm: true },
  { inputKey: 'chest', withcm: true },
];

const TopInitValues: TopValuesType = { size: '', topLength: '', shoulder: '', chest: '' };

const BottomInputList = [
  { inputKey: 'size', withcm: false },
  { inputKey: 'bottomLength', withcm: true },
  { inputKey: 'waist', withcm: true },
  { inputKey: 'thigh', withcm: true },
  { inputKey: 'rise', withcm: true },
  { inputKey: 'hem', withcm: true },
];

const BottomInitValues: BottomValuesType = { size: '', bottomLength: '', waist: '', thigh: '', rise: '', hem: '' };

function SizeWrite() {
  const topOrBottom = useRecoilValue(topOrBottomState);
  const [measure, setMeasure] = useState('단면');
  const [, setCurrentView] = useRecoilState(currentViewState);
  const [, setProductSize] = useRecoilState(productSelfWriteState);
  const { onClickOption: handleSizeRecommend } = useSizeCompare();
  const userId = JSON.parse(localStorage.getItem('userId') ?? '-99');

  const {
    values,
    handleChange,
    handleBlur,
    addedValues,
    handleChangeAdded,
    handleBlurAdded,
    handleSubmit,
    isAddRow,
    setIsAddRow,
  } = useForm({
    initialValues: topOrBottom === 'top' ? TopInitValues : BottomInitValues,
    onSubmit: async (values) => {
      const sizes: SizeTableType[] = [];
      const inputData: SizeTableType = {
        size: '',
        topLength: null,
        shoulder: null,
        chest: null,
        isWidthOfTop: true,
        bottomLength: null,
        waist: null,
        thigh: null,
        rise: null,
        hem: null,
        isWidthOfBottom: true,
        topOrBottom: 0,
        userId: userId,
        topItemId: 0,
        bottomItemId: 0,
      };
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tabs[0].url;
      const productId = parseInt(url?.split('/').pop() ?? '-99');

      if (topOrBottom === 'bottom') {
        inputData.topOrBottom = 1;
        inputData.bottomItemId = productId;
      } else {
        inputData.topItemId = productId;
      }

      if (measure === '둘레') {
        inputData.isWidthOfTop = false;
        inputData.isWidthOfBottom = false;
      }

      Object.entries(values).map(([inputKey, inputValue]) => {
        if (inputKey === 'size') {
          inputData.size = inputValue;
        } else {
          inputData[inputKey] = parseFloat(inputValue);
        }
      });

      localStorage.setItem('productSizes', JSON.stringify(inputData));
      setProductSize(inputData);
      setCurrentView('compare');

      // 두번째 사이즈 칼럼이 존재하는 경우
      if (isAddRow) {
        const addedInput: SizeTableType = {
          size: '',
          topLength: null,
          shoulder: null,
          chest: null,
          isWidthOfTop: true,
          bottomLength: null,
          waist: null,
          thigh: null,
          rise: null,
          hem: null,
          isWidthOfBottom: true,
          topOrBottom: 0,
          userId: userId,
          topItemId: 0,
          bottomItemId: 0,
        };

        if (topOrBottom === 'bottom') {
          addedInput.topOrBottom = 1;
          addedInput.bottomItemId = productId;
        } else {
          addedInput.topItemId = productId;
        }

        if (measure === '둘레') {
          addedInput.isWidthOfTop = false;
          addedInput.isWidthOfBottom = false;
        }

        Object.entries(addedValues).map(([inputKey, inputValue]) => {
          if (inputKey === 'size') {
            addedInput.size = inputValue;
          } else {
            addedInput[inputKey] = parseFloat(inputValue);
          }
        });

        sizes.push(inputData, addedInput);
        const body = {
          sizes,
        };

        handleSizeRecommend(body, url ?? '');
      }
    },
  });

  return (
    <Layout title="지금 보고 있는 옷의 궁금한 사이즈를 입력해주세요" back close>
      <Styled.Root>
        <Styled.RadioButtonContainer>
          <RadioButton label="단면" isClicked={measure === '단면'} onClick={() => setMeasure('단면')} />
          <RadioButton label="둘레" isClicked={measure === '둘레'} onClick={() => setMeasure('둘레')} />
        </Styled.RadioButtonContainer>
        <Styled.FormContainer>
          {topOrBottom === 'top' ? (
            <>
              <FormHeader formHeaderList={['사이즈', '총장', `어깨 ${measure}`, `가슴 ${measure}`]} />
              <FormRow
                inputList={TopInputList}
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </>
          ) : (
            <>
              <FormHeader
                formHeaderList={['사이즈', '총장', '밑위', `허리 ${measure}`, `허벅지 ${measure}`, `밑단 ${measure}`]}
              />
              <FormRow
                inputList={BottomInputList}
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </>
          )}

          {isAddRow && (
            <FormRow
              inputList={topOrBottom === 'top' ? TopInputList : BottomInputList}
              values={addedValues}
              handleBlur={handleBlurAdded}
              handleChange={handleChangeAdded}
              handleSubmit={handleSubmit}
              isAddRow={isAddRow}
              onClickDelete={() => setIsAddRow(null)}
            />
          )}
        </Styled.FormContainer>
        <AddRowButton onClick={() => setIsAddRow(topOrBottom)} isShow={!isAddRow} />
      </Styled.Root>
      <Styled.SubmitButton type="submit" onClick={handleSubmit}>
        사이즈 추천 받기
      </Styled.SubmitButton>
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
  SubmitButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.8rem;
    background-color: ${theme.colors.black};
    color: ${theme.colors.gray000};
    ${theme.fonts.body2};
  `,
};
