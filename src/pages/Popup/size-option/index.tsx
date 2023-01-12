import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { client } from '../../../apis';
import { postSizeTable } from '../../../apis/api';
import imgBottom from '../../../assets/img/bottom.svg';
import imgTop from '../../../assets/img/top.svg';
import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import OptionButton from '../../../components/size-option/OptionButton';
import { IsRegisterType } from '../../../states';
import { currentViewState, historyState, mySizeState, topOrBottomState, userDataState } from '../../../states/atom';
import theme from '../../../styles/theme';
import { InfoType, SizeInfoType } from '../../../types/content';
import { PostSizeTableInput } from '../../../types/remote';

function SizeOption() {
  const [selectedOption, setSelectedOption] = useState<'top' | 'bottom'>();
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [history, setHistory] = useRecoilState(historyState);
  const mySize = useRecoilValue(mySizeState);
  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    const isRegister = localStorage.getItem('isRegister') as IsRegisterType;
    const userId = localStorage.getItem('userId') as string;
    // const token = localStorage.getItem('token') as string;
    const token = userData.token;

    /** isRegister
     * null : 초기 뷰
     * false : 로그인만 하고 실측치 입력 X
     * true : 실측치 입력 완료
     */

    if (isRegister === 'null') {
      /** TODO : 초기 뷰 띄우기 */
      return;
    }

    if (isRegister === 'false') {
      setCurrentView('nosize');
      return;
    }

    setUserData({ isRegister, userId, token });

    client.defaults.headers.Authorization = `Bearer ${token}`;
  }, []);

  const getBody = async () => {
    const sizeTable = await getSizeTable(); // 사이즈 테이블 받아오기 함수 호출

    sizeTable.forEach((row: PostSizeTableInput) => {
      row['isManual'] = false;
      row['manualInputNum'] = null;
      row['isWidthOfTop'] = true;
      row['topOrBottom'] = selectedOption === 'top' ? 0 : 1;

      // top
      row['topItemId'] = row.topItemId || null;
      row['topLength'] = row.topLength || null;
      row['shoulder'] = row.shoulder || null;
      row['chest'] = row.chest || null;
      row['isWidthOfTop'] = row.isWidthOfTop || null;

      // bottom
      row['bottomItemId'] = row.bottomItemId || null;
      row['bottomLength'] = row.bottomLength || null;
      row['waist'] = row.waist || null;
      row['thigh'] = row.thigh || null;
      row['rise'] = row.rise || null;
      row['hem'] = row.hem || null;
      row['isWidthOfBottom'] = row.isWidthOfBottom || null;
    });

    return sizeTable;
  };

  const onClickOption = async (selectedOption: 'top' | 'bottom') => {
    if (!selectedOption) return;
    setSelectedOption(selectedOption);

    // 사이즈 테이블을 바탕으로 body 구성
    const body = await getBody();

    console.log('body', body);
    // 사이즈표 저장하기 POST 호출

    const dummy = [
      {
        isManual: false,
        manualInputNum: null,
        topOrBottom: 0,
        size: 'S',
        topItemId: 111111,
        topLength: 55,
        shoulder: 60,
        chest: 58,
        isWidthOfTop: true,
        bottomItemId: null,
        bottomLength: null,
        waist: null,
        thigh: null,
        rise: null,
        hem: null,
        isWidthOfBottom: null,
      },
    ];
    await postSizeTable(dummy);

    setTimeout(() => {
      setHistory(currentView);
      renderNextView();
    }, 100);
  };

  // sync에 저장한 사이즈표 데이터 가져오기
  const getSizeTable = async () => {
    const { sizeTable } = await chrome.storage.sync.get(['sizeTable']);
    return sizeTable as PostSizeTableInput[];
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
