import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { saveProductToAllCloset } from '../../../apis/api';
import { currentViewState, historyState, productState, topOrBottomState, userDataState } from '../../../states/atom';
import theme from '../../../styles/theme';
import { SaveProductInput } from '../../../types/remote';

interface ButtonProps {
  content: ContentType;
}

type ContentType = '저장' | '사이즈 추천 받기';

interface ColorMapType {
  background: string;
  text: string;
}

const contentMap = {
  저장: {
    text: theme.colors.gray200,
    background: theme.colors.black,
  },
  '사이즈 추천 받기': {
    text: theme.colors.black,
    background: theme.colors.yellow,
  },
};
const colorMapper = (content: ContentType): ColorMapType => {
  return contentMap[content];
};

function Button(props: ButtonProps) {
  const { content } = props;
  const { text, background } = colorMapper(content);
  const topOrBottom = useRecoilValue(topOrBottomState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [history, setHistory] = useRecoilState(historyState);
  const { userId } = useRecoilValue(userDataState);

  // 옷장 저장 api 호출
  const postProductData = async (body: SaveProductInput) => {
    await saveProductToAllCloset(body);
  };

  // save-product 뷰에서 익스텐션 껐다 켰을 때 상품 이미지 보관을 위해 작성함
  const storeProductImage = (image: string) => {
    localStorage.setItem('productImage', image);
  };

  // image, productName, mallName명 가져오기
  const getProductData = async () => {
    const { product } = await chrome.storage.sync.get(['product']);
    storeProductImage(product.image);
    return product;
  };

  // favIconUrl, productUrl,topOrBottom 가져오기
  const getUrlData = async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const { favIconUrl, url } = tabs[0];
    return { faviconUrl: favIconUrl, productUrl: url, topOrBottom: topOrBottom === 'top' ? 0 : 1 };
  };

  // 저장하기 버튼 클릭
  const onClickSaveProduct = async () => {
    const product = await getProductData(); // 상품 이미지 및 상품명
    const url = await getUrlData();

    await getUrlData(); // 각종 이미지 정보 및 상하의 정보
    const body = { ...product, ...url, userId };
    console.log(body);

    // 옷장 저장 api 호출
    await postProductData(body);
    renderNextView();
  };

  // 뷰 라우팅
  const renderNextView = () => {
    setHistory(currentView);
    setCurrentView('save');
  };

  return (
    <Root text={text} background={background} onClick={onClickSaveProduct}>
      {content}
    </Root>
  );
}

export default Button;

const Root = styled.div<{ text: string; background: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6.6rem;
  color: ${({ text }) => text};
  background-color: ${({ background }) => background};
  cursor: pointer;
  ${theme.fonts.title2}
`;
