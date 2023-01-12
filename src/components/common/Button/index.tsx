import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { saveProductToAllCloset } from '../../../apis/api';
import { currentViewState, historyState, productState, topOrBottomState } from '../../../states/atom';
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

  // 옷장 저장 api 호출
  const postProductData = async (body: SaveProductInput) => {
    await saveProductToAllCloset(body);
  };

  // 뷰 라우팅
  const updateView = () => {
    setHistory(currentView);
    setCurrentView('save');
  };

  // image, productName, mallName명 가져오기
  const getProductData = async () => {
    const { product } = await chrome.storage.sync.get(['product']);
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
    const body = { ...product, ...url, userId: '1' };
    const dummy = {
      productUrl: '상품url',
      image: '이미지',
      mallName: '나이키',
      productName: '차콜 맨투맨',
      size: 'XL',
      isRecommend: true,
      topOrBottom: 0,
      faviconUrl: '브랜드로고url',
    };

    // 옷장 저장 api 호출
    await postProductData(dummy);
    updateView();
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
