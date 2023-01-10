import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';
import { currentViewState, productState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SaveProduct() {
  const [, setCurrentView] = useRecoilState(currentViewState);

  const getLink = <Styled.Link onClick={() => setCurrentView('compare')}>{LINK.SAVE}</Styled.Link>;
  const { image } = useRecoilValue(productState);

  return (
    <Layout close>
      <Main image={<Styled.Image src={image} />} content={MESSAGE.SAVE_MY_CLOSET} link={getLink} noPadding />
      <Button content="사이즈 추천 받기" />
    </Layout>
  );
}

export default SaveProduct;

const Styled = {
  Link: styled.a`
    ${theme.fonts.body3};
    color: ${theme.colors.black};
    border-bottom: 1px solid ${theme.colors.black};
  `,
  Image: styled.img`
    width: 11rem;
    height: 11rem;
    object-fit: contain;
    margin-bottom: 2.6rem;
  `,
};
