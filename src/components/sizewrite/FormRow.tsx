import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';

interface RowProps {
  inputList: { inputKey: string; withcm: boolean }[];
}

function FormRow(props: RowProps) {
  const { inputList } = props;

  return (
    <Styled.RootForm>
      {inputList.map(({ inputKey, withcm }) => (
        <Styled.InputContainer>
          <Styled.Input type={withcm ? 'number' : 'text'} name={inputKey} />
          <Styled.CMContainer iscm={withcm}>cm</Styled.CMContainer>
        </Styled.InputContainer>
      ))}
    </Styled.RootForm>
  );
}

export default FormRow;

const Styled = {
  RootForm: styled.form`
    display: flex;
    justify-content: space-around;
    width: 55rem;
    margin-top: 1.8rem;
  `,
  InputContainer: styled.div`
    display: flex;
    align-items: flex-end;
  `,
  CMContainer: styled.span<{ iscm: boolean }>`
    position: fixed;
    display: ${({ iscm }) => (iscm ? 'flex' : 'none')};
    margin-left: 6.2rem;
    color: ${theme.colors.gray350};
    ${theme.fonts.radioText};
  `,
  Input: styled.input`
    width: 6rem;
    height: 3rem;
    background: ${theme.colors.gray000};
    border: 0;
    border-radius: 0.5rem;
    text-align: center;
    color: ${theme.colors.gray550};
    ${theme.fonts.bodydsb};
  `,
};
