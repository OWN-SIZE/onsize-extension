import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import skeleton from '../../../assets/img/skeleton.svg';
import Layout from '../../../components/common/Layout';
import Main from '../../../components/common/Main';
import SizeRecommendButton from '../../../components/save-product/SizeRecommendButton';
import { DOMAIN } from '../../../contants/domain';
import { LINK, MESSAGE } from '../../../contants/text';
import { productState, sizeRecommendState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SaveProduct() {
  const sizeRecommend = useRecoilValue(sizeRecommendState);
  const { image } = useRecoilValue(productState);
  const storageImage = localStorage.getItem('productImage');
  const [isLoading, setIsLoading] = useState(true);

  const onClickMoveToCloset = () => {
    localStorage.removeItem('history');
    localStorage.removeItem('currentView');
    // window.open(DOMAIN.HOME);
    chrome.tabs.create({
      url: DOMAIN.HOME,
    });
  };

  const getLink = <Styled.Link onClick={onClickMoveToCloset}>{LINK.SAVE}</Styled.Link>;

  const noRecommendedSize = !sizeRecommend || sizeRecommend === 'nosize';
  return (
    <Layout close>
      <Main
        image={
          <Styled.Image
            width="110"
            height="110"
            src={isLoading ? skeleton : storageImage || image}
            alt="저장한 상품"
            loading="lazy"
            data-src={isLoading ? skeleton : storageImage || image}
            onLoad={() => setIsLoading(false)}
          />
        }
        content={MESSAGE.SAVE_MY_CLOSET}
        link={getLink}
        noPadding
      />
      {noRecommendedSize && <SizeRecommendButton />}
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
