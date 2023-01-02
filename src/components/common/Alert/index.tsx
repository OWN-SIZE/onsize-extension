import React from 'react';
import styled from 'styled-components';
import icAlert from '../../../assets/icons/alert.svg';

function Alert() {
  return (
    <Styled.Root>
      <img src={icAlert} alt="alert" />
    </Styled.Root>
  );
}

export default Alert;

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};
