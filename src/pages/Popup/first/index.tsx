import React from 'react';
import styled from 'styled-components';

import icCharacter from '../../../assets/img/character.svg';
import Layout from '../../../components/common/Layout';
import theme from '../../../styles/theme';

function First() {
  const onClickButton = () => {
    // TODO
  };
  return (
    <Layout close>
      <Styled.Root>
        <Styled.Image src={icCharacter} alt="캐릭터 이미지" />
        <Styled.Message>환영합니다!</Styled.Message>
        <Styled.Button onClick={onClickButton}>사이즈 추천받으러 가기</Styled.Button>
      </Styled.Root>
    </Layout>
  );
}

export default First;

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  Image: styled.img`
    width: 15rem;
    height: 14rem;
    margin-top: 1.8rem;
  `,
  Message: styled.h1`
    color: #000000;
    ${theme.fonts.title2};
    margin-top: 2.1rem;
  `,
  Button: styled.button`
    width: 30.4rem;
    height: 5.3rem;
    margin-top: 4.7rem;
    background: ${theme.colors.black};
    border-radius: 3rem;
    color: ${theme.colors.gray000};
    ${theme.fonts.title2}
  `,
};
