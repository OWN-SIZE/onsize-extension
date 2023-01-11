import styled from 'styled-components';

import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import theme from '../../../styles/theme';

function SizeRecommend() {
  return (
    <Layout close>
      <Styled.Root>
        <Styled.Title>나와 가장 잘 맞는 사이즈는</Styled.Title>
        <Styled.Size></Styled.Size>
        <Styled.Link
          onClick={() => {
            /** TODO : userId와 함께 웹 도메인 window.open */
          }}
        >
          나의 옷장으로 이동
        </Styled.Link>
      </Styled.Root>
      <Button content="저장" />
    </Layout>
  );
}

export default SizeRecommend;

const Styled = {
  Root: styled.div`
    height: 27.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4rem;
  `,
  Title: styled.h1`
    ${theme.fonts.title1};
    color: ${theme.colors.black};
  `,
  Size: styled.div`
    border: 1px solid black;
    width: 6.3rem;
    height: 9.3rem;
    margin-top: 2.7rem;
  `,
  Link: styled.a`
    ${theme.fonts.body3};
    color: ${theme.colors.black};
    border-bottom: 1px solid #1e2025;
    margin-top: 2.6rem;
  `,
};
