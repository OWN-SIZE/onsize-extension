import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { client } from '../../../apis';
import { postSizeTable, saveResult } from '../../../apis/api';
import imgBottom from '../../../assets/img/bottom.svg';
import imgTop from '../../../assets/img/top.svg';
import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import OptionButton from '../../../components/size-option/OptionButton';
import { currentViewState, historyState, mySizeState, productState, userDataState } from '../../../states/atom';
import theme from '../../../styles/theme';
import { PostSizeTableInput, SaveResultInput, SizeTableType } from '../../../types/remote';

function SizeOption() {
  const [selectedOption, setSelectedOption] = useState<'top' | 'bottom'>();
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [, setHistory] = useRecoilState(historyState);
  const [mySize, setMySize] = useRecoilState(mySizeState);
  const [userData, setUserData] = useRecoilState(userDataState);
  const productData = useRecoilValue(productState);

  // 상품 Id 조회
  const getProductId = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tabs[0].url;
    if (!url) return;

    const forwardUrlIndex = url.match('goods/')?.index;
    const questionMarkIndex = url.split('').indexOf('?');
    console.log(questionMarkIndex);

    if (!forwardUrlIndex) return;
    const productId =
      questionMarkIndex >= 0
        ? Number(url?.slice(forwardUrlIndex + 6, questionMarkIndex))
        : Number(url?.slice(forwardUrlIndex + 6));
    return productId;
  };

  // sync에 저장한 사이즈표 데이터 가져오기
  const getSizeTable = async () => {
    const { sizeTable } = await chrome.storage.local.get(['sizeTable']);
    return sizeTable as SizeTableType[];
  };

  const getBody = async (option: 'top' | 'bottom') => {
    const sizeTable = await getSizeTable(); // 사이즈 테이블 받아오기 함수 호출
    const productId = (await getProductId()) || null;

    let sizeList: SizeTableType[] = [];
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
      sizeList = [...sizeList, data];
    });
    const body: PostSizeTableInput = {
      sizes: sizeList,
    };
    console.log(body);
    return body;
  };

  useEffect(() => {
    (async () => {
      const { token } = await chrome.storage.local.get(['token']);
      const { userId } = await chrome.storage.local.get(['userId']);
      const { isRegister } = await chrome.storage.local.get(['isRegister']);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('isRegister', isRegister);

      console.log('hello ... token:', token, 'userId:', userId, 'iR:', isRegister);

      // 회원이 아닌 경우
      if (isRegister === 'false' && !userId) {
        setCurrentView('first');
        return;
      }

      // 로그인만 하고 실측치 입력을 안 한 경우
      if (isRegister === 'false' && userId) {
        setMySize({ top: null, bottom: null });
        return;
      }

      // api 요청 헤더에 token 추가
      client.defaults.headers.token = token;

      setUserData({ isRegister, userId: +userId, token });
    })();

    setHistory(currentView);
  }, []);

  const onClickOption = async (option: 'top' | 'bottom') => {
    if (!option) return;
    setSelectedOption(option);

    // 사이즈 테이블을 바탕으로 body 구성
    const body = await getBody(option);
    const dummy = {
      sizes: [
        {
          isManual: false,
          manualInputNum: null,
          topOrBottom: 1,
          size: 'S',
          topItemId: null,
          topLength: null,
          shoulder: null,
          chest: null,
          isWidthOfTop: null,
          bottomItemId: 123,
          bottomLength: 90,
          waist: 30,
          thigh: 32,
          rise: 20,
          hem: 20,
          isWidthOfBottom: true,
          userId: 24,
        },
      ],
    };
    console.log('힘들다', body, dummy);

    // 사이즈표 저장하기 POST 호출
    await postSizeTable(body);

    setTimeout(async () => {
      await getSizeRecommendResult(option);
      renderNextView();
    }, 100);
  };

  const getSizeRecommendResult = async (selectedOption: 'top' | 'bottom') => {
    // 상품 정보
    const productId = (await getProductId()) || null;

    const body: SaveResultInput = {
      topOrBottom: selectedOption === 'top' ? 0 : 1,
      url: productData.productUrl,
      topItemId: selectedOption === 'top' ? productId : null,
      bottomItemId: selectedOption === 'bottom' ? productId : null,
    };
    // 사이즈 추천 결과 조회
    const { data } = await saveResult(body);
    console.log(data);
  };

  const renderNextView = () => {
    mySize ? setCurrentView('nosize') : setCurrentView('size-recommend');
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
      <Button content="저장" />
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
