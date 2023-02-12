import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postSizeTable, saveResult } from '../../../apis/api';
import imgBottom from '../../../assets/img/bottom.svg';
import imgTop from '../../../assets/img/top.svg';
import Layout from '../../../components/common/Layout';
import OptionButton from '../../../components/size-option/OptionButton';
import SaveButton from '../../../components/size-option/SaveButton';
import { useRedirect } from '../../../hooks/queries/useRedirect';
import {
  currentViewState,
  historyState,
  productState,
  sizeRecommendState,
  topOrBottomState,
} from '../../../states/atom';
import theme from '../../../styles/theme';
import { PostSizeTableInput, SaveResultInput, SizeTableType } from '../../../types/remote';

function SizeOption() {
  const [selectedOption, setSelectedOption] = useState<'top' | 'bottom'>();
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [, setHistory] = useRecoilState(historyState);
  const [, setProductData] = useRecoilState(productState);
  const [, setSizeRecommend] = useRecoilState(sizeRecommendState);
  const [, setTopOrBottom] = useRecoilState(topOrBottomState);

  const { redirect } = useRedirect();

  useEffect(() => {
    (async () => {
      await redirect();
    })();

    setHistory(currentView);
  }, [currentView, redirect, setHistory]);

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
    setCurrentView('loading');
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

    await handleSizeTable(option);

    setTimeout(async () => {
      await getSizeRecommendResult(option);
      renderNextView();
    }, 100);
  };

  return (
    <Layout close>
      <Styled.Root>
        지금 어떤 옷을 보고 있나요?
        <Styled.OptionContainer>
          <OptionButton
            onClick={() => onClickOption('top')}
            src={imgTop}
            caption={'상의'}
            isActive={selectedOption === 'top'}
          />
          <OptionButton
            onClick={() => onClickOption('bottom')}
            src={imgBottom}
            caption={'하의'}
            isActive={selectedOption === 'bottom'}
          />
        </Styled.OptionContainer>
      </Styled.Root>
      <SaveButton />
    </Layout>
  );
}

export default SizeOption;

const Styled = {
  Root: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2.8rem;
    color: ${theme.colors.black};
    ${theme.fonts.title1};
  `,
  OptionContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 3.4rem;
    justify-content: center;
    margin-top: 3.5rem;
    margin-bottom: 3.8rem;
  `,
};
