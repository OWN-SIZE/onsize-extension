import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import { LINK, MESSAGE } from '../../../contants/main';
import { productState, sizeRecommendState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SaveProduct() {
  const size = useRecoilValue(sizeRecommendState);

  const getLink = (
    <Styled.Link
      onClick={() => {
        window.open('https://ownsize.me/home');
      }}
    >
      {LINK.SAVE}
    </Styled.Link>
  );
  const { image } = useRecoilValue(productState);
  const storageItem = localStorage.getItem('productImage');
  console.log(storageItem);

  return (
    <Layout close>
      <Main
        image={<Styled.Image src={storageItem || image} />}
        content={MESSAGE.SAVE_MY_CLOSET}
        link={getLink}
        noPadding
      />
      {!size && <Button content="사이즈 추천 받기" />}
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
