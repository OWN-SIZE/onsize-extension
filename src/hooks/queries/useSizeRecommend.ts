import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { postSizeTable, saveResult } from '../../apis/api';
import {
  currentViewState,
  historyState,
  isSelfWriteState,
  productState,
  sizeRecommendState,
  topOrBottomState,
} from '../../states/atom';
import { PostSizeTableInput, SaveResultInput, SizeTableType } from '../../types/remote';

export const useSizeRecommend = () => {
  const [selectedOption, setSelectedOption] = useState<'top' | 'bottom'>();
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [, setHistory] = useRecoilState(historyState);
  const [, setProductData] = useRecoilState(productState);
  const [, setSizeRecommend] = useRecoilState(sizeRecommendState);
  const [, setTopOrBottom] = useRecoilState(topOrBottomState);
  const isSelfWrite = useRecoilValue(isSelfWriteState);

  // 상품 Id 조회
  const getProductData = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tabs[0].url;
    setProductData((prev) => ({ ...prev, productUrl: url || '' }));

    if (!url) return;

    const forwardUrlIndex = url.match('goods/')?.index;
    const questionMarkIndex = url.split('').indexOf('?');

    if (!forwardUrlIndex) return;
    const productId =
      questionMarkIndex >= 0
        ? Number(url?.slice(forwardUrlIndex + 6, questionMarkIndex))
        : Number(url?.slice(forwardUrlIndex + 6));
    return { productId, url };
  };

  // sync에 저장한 사이즈표 데이터 가져오기
  const getSizeTable = async () => {
    const { sizeTable } = await chrome.storage.local.get(['sizeTable']);
    return sizeTable as SizeTableType[];
  };

  const getBody = async (option: 'top' | 'bottom') => {
    const sizeTable = await getSizeTable(); // 사이즈 테이블 받아오기 함수 호출
    const { productId } = (await getProductData()) || { productId: 0, url: '' };

    let sizes: SizeTableType[] = [];
    sizeTable.forEach((table) => {
      const { size, topLength, shoulder, chest, bottomLength, hem, rise, thigh, waist } = table;
      const data: SizeTableType = {
        isManual: false,
        manualInputNum: null,
        topOrBottom: option === 'top' ? 0 : 1,
        userId: Number(localStorage.getItem('userId')) || null,
        size: size,

        topItemId: option === 'top' ? productId : null,
        topLength: topLength || null,
        shoulder: shoulder || null,
        chest: chest || null,
        isWidthOfTop: option === 'top' ? true : null,

        bottomItemId: option === 'bottom' ? productId : null,
        bottomLength: bottomLength || null,
        hem: hem || null,
        rise: rise || null,
        thigh: thigh || null,
        waist: waist || null,
        isWidthOfBottom: option === 'bottom' ? true : null,
      };
      sizes = [...sizes, data];
    });
    const body: PostSizeTableInput = {
      sizes,
    };
    return body;
  };

  // 사이즈 추천 결과 조회
  const getSizeRecommendResult = async (selectedOption: 'top' | 'bottom') => {
    // 상품 정보
    const { productId, url } = (await getProductData()) || { productId: 0, url: '' };

    const body: SaveResultInput = {
      topOrBottom: selectedOption === 'top' ? 0 : 1,
      url,
      topItemId: selectedOption === 'top' ? productId : null,
      bottomItemId: selectedOption === 'bottom' ? productId : null,
      userId: Number(localStorage.getItem('userId')) || null,
    };
    // 사이즈 추천 결과 조회
    const {
      data: { recommendSize },
    } = await saveResult(body);
    setSizeRecommend(recommendSize);
    localStorage.setItem('recommend-size', recommendSize || '');
  };

  // 다음 뷰 렌더링
  const renderNextView = () => {
    setTimeout(() => {
      const size = localStorage.getItem('recommend-size') || null;
      size ? setCurrentView('size-recommend') : setCurrentView('nosize');
    }, 2000);
  };

  const handleSizeTable = async (option: 'top' | 'bottom') => {
    // 사이즈 테이블을 바탕으로 body 구성
    const body = await getBody(option);

    // 사이즈표 저장하기 POST 호출
    await postSizeTable(body);
  };
  const onClickOption = async (option: 'top' | 'bottom') => {
    if (!option) return;

    setSelectedOption(option);
    setTopOrBottom(option);

    if (isSelfWrite) {
      setCurrentView('size-write');
      return;
    }
    setCurrentView('loading');

    await handleSizeTable(option);

    setTimeout(async () => {
      await getSizeRecommendResult(option);
      renderNextView();
    }, 100);
  };

  return { onClickOption };
};