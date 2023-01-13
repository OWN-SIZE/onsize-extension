import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import { sizeRecommendState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SizeRecommend() {
  const recommendSize = useRecoilValue(sizeRecommendState);

  return (
    <Layout close>
      <Styled.Root>
        <Styled.Title>나와 가장 잘 맞는 사이즈는</Styled.Title>
        <Styled.Size>{recommendSize}</Styled.Size>
        <Styled.Link
          onClick={() => {
            window.open('https://ownsize.me/home');
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
    margin-top: 2.7rem;
    font-weight: 600;
    font-size: 6.8rem;
    line-height: 9.3rem;
    color: ${theme.colors.black};
  `,
  Link: styled.a`
    ${theme.fonts.body3};
    color: ${theme.colors.black};
    border-bottom: 1px solid #1e2025;
    margin-top: 2.6rem;
  `,
};
