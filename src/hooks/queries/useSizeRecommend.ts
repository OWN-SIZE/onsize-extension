import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { fetchMySize, postSizeTable, saveResult } from '../../apis/api';
import { TopOrBottom } from '../../states';
import {
  currentViewState,
  isSelfWriteState,
  productState,
  sizeRecommendState,
  topOrBottomState,
} from '../../states/atom';
import { PostSizeTableInput, SaveResultInput, SizeTableType } from '../../types/remote';

export const useSizeRecommend = () => {
  const [, setSelectedOption] = useState<Omit<TopOrBottom, 'null'>>();
  const [, setCurrentView] = useRecoilState(currentViewState);
  const [, setProductData] = useRecoilState(productState);
  const [, setSizeRecommend] = useRecoilState(sizeRecommendState);
  const [, setTopOrBottom] = useRecoilState(topOrBottomState);
  const isSelfWrite = useRecoilValue(isSelfWriteState);

  const getProductData = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tabs[0].url;
    setProductData((prev) => ({ ...prev, productUrl: url || '' }));

    if (!url) return;

    const regex = new RegExp(/\d/, 'g');
    const matchNumbers = url.match(regex)?.join('');
    const productId = Number(matchNumbers);

    return { productId, url };
  };

  const getSizeTable = async () => {
    const { sizeTable } = await chrome.storage.local.get(['sizeTable']);
    return (sizeTable as SizeTableType[]) || [];
  };

  const getBody = async (option: TopOrBottom) => {
    const sizeTable = await getSizeTable();
    const { productId } = (await getProductData()) || { productId: 0, url: '' };

    let sizes: SizeTableType[] = [];
    sizeTable.forEach((table) => {
      const { size, topLength, shoulder, chest, bottomLength, hem, rise, thigh, waist } = table;
      const data: SizeTableType = {
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

  const getSizeRecommendResult = async (selectedOption: TopOrBottom) => {
    const { productId, url } = (await getProductData()) || { productId: 0, url: '' };

    const body: SaveResultInput = {
      topOrBottom: selectedOption === 'top' ? 0 : 1,
      url,
      topItemId: selectedOption === 'top' ? productId : null,
      bottomItemId: selectedOption === 'bottom' ? productId : null,
      userId: Number(localStorage.getItem('userId')) || null,
    };

    const {
      data: { recommendSize },
    } = await saveResult(body);
    setSizeRecommend(recommendSize);
    localStorage.setItem('recommend-size', recommendSize || '');
  };

  const renderNextView = () => {
    const size = localStorage.getItem('recommend-size') || null;
    size ? setCurrentView('size-recommend') : setCurrentView('nosize');
  };

  const sizeCrawling = async (option: TopOrBottom) => {
    // 사이즈 테이블을 바탕으로 body 구성
    const body = await getBody(option);

    await postSizeTable(body);
  };

  const checkOption = (option: TopOrBottom) => {
    if (!option) return;

    if (option === null) {
      setCurrentView('size-option');
      return;
    }
    setSelectedOption(option);
    setTopOrBottom(option);
    localStorage.setItem('topOrBottom', option);
  };

  const executeSizeRecommmend = async (option: TopOrBottom) => {
    await sizeCrawling(option);
    await getSizeRecommendResult(option);
    renderNextView();
  };

  const isEmptyData = (data: object) => {
    return Object.values(data).every((value) => value === null);
  };

  const checkMySizeExist = async (option: TopOrBottom) => {
    const { top, bottom } = await fetchMySize();

    if (option === 'top') {
      isEmptyData(top) ? setCurrentView('nosize') : executeSizeRecommmend('top');
    } else {
      isEmptyData(bottom) ? setCurrentView('nosize') : executeSizeRecommmend('bottom');
    }
  };

  const onClickOption = (option: TopOrBottom) => {
    setCurrentView('loading');

    checkOption(option);

    if (isSelfWrite) {
      setCurrentView('size-write');
      return;
    }
    checkMySizeExist(option);
  };

  return { onClickOption };
};
