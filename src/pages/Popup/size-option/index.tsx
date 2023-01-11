import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import imgBottom from '../../../assets/img/bottom.svg';
import imgTop from '../../../assets/img/top.svg';
import Button from '../../../components/common/Button';
import Layout from '../../../components/common/Layout';
import OptionButton from '../../../components/size-option/OptionButton';
import { currentViewState, historyState, mySizeState, topOrBottomState } from '../../../states/atom';
import theme from '../../../styles/theme';

function SizeOption() {
  const [selectedOption, setSelectedOption] = useState<'top' | 'bottom'>();
  const [topOrBottom, setTopOrBottom] = useRecoilState(topOrBottomState);
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [history, setHistory] = useRecoilState(historyState);
  const mySize = useRecoilValue(mySizeState);

  const onClickOption = (selectedOption: 'top' | 'bottom') => {
    if (!selectedOption) return;
    setTopOrBottom(selectedOption);
    setSelectedOption(selectedOption);

    setTimeout(() => {
      setHistory(currentView);
      renderNextView();
    }, 100);
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
