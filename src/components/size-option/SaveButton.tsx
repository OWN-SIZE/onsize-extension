import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { saveProductToAllCloset } from '../../apis/api';
import { currentViewState, historyState, sizeRecommendState, topOrBottomState } from '../../states/atom';
import theme from '../../styles/theme';
import Button from '../common/Button';

interface ProductType {
  product: {
    image: string;
    mallName: string;
    productName: string;
  };
}

interface UrlType {
  faviconUrl: string;
  productUrl: string;
}

function SaveButton() {
  const topOrBottom = useRecoilValue(topOrBottomState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [history, setHistory] = useRecoilState(historyState);
  const [userId, setUserId] = useState<number>(0);
  const sizeRecommended = useRecoilValue(sizeRecommendState);

  useEffect(() => {
    (async () => {
      const { userId } = await chrome.storage.local.get(['userId']);
      setUserId(userId);
    })();
  }, []);

  // save-product 뷰에서 익스텐션 껐다 켰을 때 상품 이미지 보관을 위해 작성함
  const storeProductImage = (image: string) => {
    localStorage.setItem('productImage', image);
  };

  // image, productName, mallName명 가져오기
  const getProductData = async () => {
    const {
      product: { image, mallName, productName },
    } = (await chrome.storage.local.get(['product'])) as ProductType;
    storeProductImage(image);
    return { image, mallName, productName };
  };

  // favIconUrl, productUrl,topOrBottom 가져오기
  const getUrlData = async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const { favIconUrl, url } = tabs[0];
    return { faviconUrl: favIconUrl, productUrl: url } as UrlType;
  };

  // 저장하기 버튼 클릭
  const onClickSaveProduct = async () => {
    const { image, mallName, productName } = await getProductData(); // 상품 이미지 및 상품명
    const { productUrl, faviconUrl } = await getUrlData();
    const body = {
      productUrl,
      image,
      mallName,
      productName: productName.replace(/ /g, '').slice(0, 36),
      size: sizeRecommended || null,
      isRecommend: sizeRecommended ? true : false,
      faviconUrl,
      userId: Number(userId),
    };
    // 옷장 저장 api 호출
    await saveProductToAllCloset(body);
    renderNextView();
  };

  // 뷰 라우팅
  const renderNextView = () => {
    setHistory(currentView);
    setCurrentView('save');
  };

  return <Button content="저장" onClick={onClickSaveProduct} />;
}

export default SaveButton;