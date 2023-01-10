import React from 'react';
import styled from 'styled-components';

import icRadio from '../../assets/icons/radio.svg';
import icRadioClicked from '../../assets/icons/radio_clicked.svg';
import theme from '../../styles/theme';

interface RadioProps {
  isClicked?: boolean;
  label?: string;
  onClick?: () => void;
}

function RadioButton(props: RadioProps) {
  const { isClicked, label, onClick } = props;
  return (
    <Styled.Root onClick={onClick}>
      {isClicked ? (
        <img src={icRadioClicked} alt="클릭된 라디오 버튼 아이콘" />
      ) : (
        <img src={icRadio} alt="라디오 버튼 아이콘" />
      )}
      <Styled.Label>{label}</Styled.Label>
    </Styled.Root>
  );
}

export default RadioButton;

const Styled = {
  Root: styled.div`
    display: flex;
    cursor: pointer;
  `,
  Label: styled.label`
    margin-left: 0.4rem;
    color: ${theme.colors.gray550};
    font-family: 'Noto Sans';
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.6rem;
  `,
};
