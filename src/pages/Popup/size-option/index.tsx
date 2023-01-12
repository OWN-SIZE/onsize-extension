import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { client } from '../../../apis';
import { fetchMySize, postSizeTable, saveResult } from '../../../apis/api';
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
  const [history, setHistory] = useRecoilState(historyState);
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

    if (!forwardUrlIndex) return;
    const productId = Number(url?.slice(forwardUrlIndex + 6, questionMarkIndex));
    return productId;
  };

  // sync에 저장한 사이즈표 데이터 가져오기
  const getSizeTable = async () => {
    const { sizeTable } = await chrome.storage.sync.get(['sizeTable']);
    return sizeTable as SizeTableType[];
  };

  const getBody = async () => {
    const sizeTable = await getSizeTable(); // 사이즈 테이블 받아오기 함수 호출
    const productId = (await getProductId()) || null;

    sizeTable.forEach((row: SizeTableType) => {
      row['isManual'] = false;
      row['manualInputNum'] = null;
      row['isWidthOfTop'] = true;
      row['topOrBottom'] = selectedOption === 'top' ? 0 : 1;

      // productId
      selectedOption === 'top' ? (row['topItemId'] = productId) : (row['bottomItemId'] = productId);
      row['userId'] = Number(userData.userId) || null;
      // top
      row['topLength'] = row.topLength || null;
      row['shoulder'] = row.shoulder || null;
      row['chest'] = row.chest || null;
      row['isWidthOfTop'] = row.isWidthOfTop || null;

      // bottom
      row['bottomLength'] = row.bottomLength || null;
      row['waist'] = row.waist || null;
      row['thigh'] = row.thigh || null;
      row['rise'] = row.rise || null;
      row['hem'] = row.hem || null;
      row['isWidthOfBottom'] = row.isWidthOfBottom || null;
    });
    const body: PostSizeTableInput = {
      sizes: sizeTable,
    };
    return body;
  };

  useEffect(() => {
    (async () => {
      const { token } = await chrome.storage.local.get(['token']);
      const { userId } = await chrome.storage.local.get(['userId']);
      const { isRegister } = await chrome.storage.local.get(['isRegister']);

      // api 요청 헤더에 token 추가
      client.defaults.headers.token = token;

      setUserData({ isRegister, userId, token });
    })();
    setHistory(currentView);
  }, []);

  useEffect(() => {
    const { token, userId, isRegister } = userData;

    // 회원이 아닌 경우
    if (isRegister === 'false' && !userId) {
      /** TODO : 초기 뷰 띄우기 */
      return;
    }

    // 로그인만 하고 실측치 입력을 안 한 경우
    if (isRegister === 'false' && userId) {
      setMySize({ top: null, bottom: null });
      return;
    }

    console.log(token, userId, isRegister);
  }, [userData]);

  const onClickOption = async (selectedOption: 'top' | 'bottom') => {
    if (!selectedOption) return;
    setSelectedOption(selectedOption);

    // 사이즈 테이블을 바탕으로 body 구성
    const body = await getBody();
    console.log(body);

    // 사이즈표 저장하기 POST 호출
    // await postSizeTable(body);

    setTimeout(async () => {
      await getSizeRecommendResult(selectedOption);
      renderNextView();
    }, 100);
  };

  const getSizeRecommendResult = async (selectedOption: 'top' | 'bottom') => {
    const productId = (await getProductId()) || null;

    console.log(productData);

    const body: SaveResultInput = {
      topOrBottom: selectedOption === 'top' ? 0 : 1,
      url: productData.productUrl,
      topItemId: selectedOption === 'top' ? productId : null,
      bottomItemId: selectedOption === 'bottom' ? productId : null,
    };
    // const { data } = await saveResult(body);
    // console.log(data);
  };

  const renderNextView = () => {
    console.log('mySize', mySize);
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
