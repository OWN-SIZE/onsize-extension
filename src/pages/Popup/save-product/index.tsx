import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';
import { productState } from '../../../states/atom';

function SaveProduct() {
  const getLink = <Styled.Link>{LINK.ANCHOR}</Styled.Link>;
  const { image } = useRecoilValue(productState);

  return (
    <Layout close>
      <Main src={image} content={MESSAGE.SAVE_MY_CLOSET} link={getLink} />
      <Button content="사이즈 추천 받기" />
    </Layout>
  );
}

export default SaveProduct;

const Styled = {
  Link: styled.a`
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.9rem;
    color: #1e2025;
    border-bottom: 1px solid #1e2025;
    cursor: pointer;
  `,
};
