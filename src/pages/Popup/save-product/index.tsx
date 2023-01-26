import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import SizeRecommendButton from '../../../components/save-product/SizeRecommendButton';
import { LINK, MESSAGE } from '../../../contants/main';
import { productState, topOrBottomState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SaveProduct() {
  const topOrBottom = useRecoilValue(topOrBottomState);

  const getLink = <Styled.Link onClick={() => window.open('https://ownsize.me/home')}>{LINK.SAVE}</Styled.Link>;
  const { image } = useRecoilValue(productState);
  const storageItem = localStorage.getItem('productImage');

  return (
    <Layout close>
      <Main
        image={<Styled.Image src={storageItem || image} />}
        content={MESSAGE.SAVE_MY_CLOSET}
        link={getLink}
        noPadding
      />
      {!topOrBottom && <SizeRecommendButton />}
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
