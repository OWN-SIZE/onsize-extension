import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';

interface AddRowProps {
  isShow?: boolean;
  onClick: () => void;
}

function AddRowButton(props: AddRowProps) {
  const { isShow, onClick } = props;
  return (
    <Styled.Root isShow={isShow} onClick={onClick}>
      궁금한 사이즈 추가
    </Styled.Root>
  );
}

export default AddRowButton;

const Styled = {
  Root: styled.button<{ isShow?: boolean }>`
    display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    width: 15.1rem;
    height: 3rem;
    margin-bottom: 2.5rem;
    background: ${theme.colors.yellow01};
    box-shadow: 0.4rem 0.4rem 1rem rgba(217, 217, 217, 0.2);
    border-radius: 1.5rem;
    color: ${theme.colors.gray550};
    ${theme.fonts.radioText};
  `,
};
